
import tensorflow as tf
import pandas as pd
from tensorflow.keras.models import load_model
import pickle
from sklearn.preprocessing import MinMaxScaler
from flask import jsonify
from flask import request, make_response,Response
import numpy as np
import warnings
import json 
from flask import Flask
warnings.filterwarnings("ignore")

class user_score():

    def __init__(self):
        self.template={"score":"","max_score": "700", "improve":""}
        self.improvement_dict=[{'improvement': 'diversity_score',
                                'text': "Diversify your mutual funds. Don't invest only in one type of funds"},
                                {'improvement': 'roi_score',
                                'text': 'Your overall mutual fund rate of return is low. Try to invest in high return funds'},
                                {'improvement': 'risk_score',
                                'text': 'Diversify your risk. Most of the funds are under same risk.'},
                                {'improvement': 'investment_score',
                                'text': "You can have funds available for investments. It's a good practice to invest 10-15% of your funds"},
                                {'improvement': 'time_score',
                                'text': 'Its good to invest the mutual funds for a longer period to get the power of compound interest'},
                                {'improvement': 'credit_score',
                                'text': 'Try to pay outstanding payments on time as impacts on your financial score'},
                                {'improvement': 'confidence_score',
                                'text': 'Try to invest for more time and more funds, to get higher returns using the power of compound interest'}]

    def get_response(self,dict):
        try:
            return jsonify(dict)
        except Exception as ex:
            return self.get_exception_response(ex)
    
    def get_exception_response(self,ex):
        return Response(ex,500)

    def extract_data(self,user_data):
        df_cols=["member_id","last_payment_date","first_loan_start_date","open_acc","loan_payment_till_date","total_loan","account_balance"]
        user_df=pd.DataFrame(user_data)
        user_details=user_df[df_cols]
        mf_details=pd.read_json(user_df["mf_details"][0])
        mf_details["member_id"]=int(user_details["member_id"][0])
        result=user_details.merge(mf_details,on="member_id")         
        return result

    def get_scoring_result(self,user_profile):
        try:
            user_df=self.extract_data(user_profile)
            user_data=self.get_formatted_input(user_df) 
            score=self.get_user_score(user_data)
            improvements=self.get_improvement_prediction(user_data)
            self.template["score"]=score
            self.template["improve"]=improvements
            self.template["max_score"]="700"        
            
            return self.get_response(self.template)
        except Exception as ex:
            #return self.get_exception_response(ex)
            raise

    def get_user_score(self,user_data):
        
        #Reading the model from JSON file
        with open("models/model_user_score.json", 'r') as json_file:
            json_savedModel= json_file.read()
        #load the model architecture 
        model = tf.keras.models.model_from_json(json_savedModel)    
        model.load_weights("models/Weights-048--21.52199.hdf5") # load it
        model.compile(loss='mean_absolute_error', optimizer='adam', metrics=['mean_absolute_error'])    
        
        predictions = int(model.predict(user_data))
        return predictions

    def get_improvement_prediction(self,user_data):
        IMPROVEMENT_MODEL="models/improvement_nn_model.h5"
        model = load_model(IMPROVEMENT_MODEL, compile = False)        
        predictions = model.predict(user_data)
        top_2=(-predictions.ravel()).argsort()[:2]
        improvements=pd.read_pickle("pickle_data/improvement_mapping.pkl")
        indexs=improvements[(improvements["index"].isin(top_2))]["improvement"].to_list()
        improve_df=pd.DataFrame(self.improvement_dict)
        improve_text=improve_df[improve_df["improvement"].isin(indexs)]["text"].to_list()
        return improve_text


    def cat_types_weights(self,cat_types_freq):
        total=np.sum(list(cat_types_freq.values()))
        mf_types_weight =np.sum([0.2*(freq/total) for mf,freq in cat_types_freq.items()]) 
        return mf_types_weight

    def calculate_cumulative_freq(self,df,col,freq_col):
            cumulative_dict=df[col].value_counts().to_dict()
            print(cumulative_dict)
            cumulative_sum= np.sum([row[col]*row[freq_col] for idx,row in df.iterrows()])
            return cumulative_sum

    def get_freq(self,df,col,key):
        cumulative_dict=df[col].value_counts().to_dict()
        if key not in cumulative_dict.keys():
            return 0
        return cumulative_dict[key]

    def calculate_cumulative_sum(self,df,col,categoy=False,func=None):
        if categoy:
            df[col]=df[col].astype("category").cat.codes
            df[col]=df[col]+1
        
        cumulative_dict=df[col].value_counts().to_dict()
        if func is not None:
            return func(cumulative_dict)
        cumulative_sum= np.sum([k*v for k,v in cumulative_dict.items()])
        return cumulative_sum

    def get_formatted_input(self,df):    
        #Converting the datatype to Datetime
        df['last_payment_date']=pd.to_datetime(df["last_payment_date"],format='%Y-%m-%d')
        #Converting the datatype to Datetime
        df['first_loan_start_date']=pd.to_datetime(df["first_loan_start_date"],format='%Y-%m-%d')
        #credit history
        df['credit_history']=(df['last_payment_date']-df['first_loan_start_date'])/np.timedelta64(1, 'D')

        #current level of indebtedness
        df['indebtedness']=df['loan_payment_till_date']/df['total_loan']*100
        if (df['indebtedness'].isnull().values.any()):
            df['indebtedness']=0
            
        df["cumulative_tenure"]=self.calculate_cumulative_sum(df,"mutual_fund_held_since")


        df["cumulative_inv_amount"]=self.calculate_cumulative_sum(df,"mutual_fund_amount")
        df["cumulative_risk"]=self.calculate_cumulative_sum(df,"mutual_fund_risk",False,self.cat_types_weights)

        df["cumulative_mf_cat"]=self.calculate_cumulative_sum(df,"mutual_fund_category",False,self.cat_types_weights)
        df["total_tenure"]=np.sum(df["mutual_fund_held_since"])
        df["total_mutual_fund_amount"]=np.sum(df["mutual_fund_amount"])
        df["total_mutual_fund_return"]=np.sum(df["mutual_fund_return"])
        
        
        mf_cat_cols={"Equity Scheme":'mf_cat_equity_scheme',
        "Debt Scheme":'mf_cat_debt_scheme',
        "Other Scheme":'mf_cat_other_scheme',
        "Hybrid Scheme":'mf_cat_hybrid_scheme',
        "Solution Scheme":'mf_cat_solution_scheme',
        "Others":'mf_cat_others'}

        for k,v in mf_cat_cols.items():
            df[v]=self.get_freq(df,"mutual_fund_category",v)

        model_columns=['months_since_default', 'credit_history', 'open_acc', 'indebtedness',
            'total_mutual_fund_amount', 'total_mutual_fund_return', 'account_balance', 'cumulative_tenure',
            'cumulative_inv_amount', 'cumulative_risk', 'cumulative_mf_cat', 'total_tenure',
            'mf_cat_equity_scheme', 'mf_cat_debt_scheme', 'mf_cat_other_scheme',
            'mf_cat_hybrid_scheme', 'mf_cat_solution_scheme', 'mf_cat_others']
        
        input_data=df[model_columns].drop_duplicates().head(1)
        return input_data
