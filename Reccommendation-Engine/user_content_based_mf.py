import tensorflow as tf
import pandas as pd
from tensorflow.keras.models import load_model
import pickle
from mf_performance_details import mf_performance
from sklearn.preprocessing import MinMaxScaler
from flask import jsonify
from flask import request, make_response,Response

class content_based_recommend():

    def __init__(self):
        self.MODEL_NAME="models/content_based_recommendar_model.h5"
        self.MF_OUTPUT_MAPPING="pickle_data/mf_output_mapping.pkl.bz2"
        self.MF_FILE_NAME="pickle_data/mf_data_popular.pkl.bz2"
        self.mf_perf=mf_performance()

    def load_dict(self,file_name):
        print("load_dict")
        file_to_read = open(file_name, "rb")
        loaded_dictionary = pickle.load(file_to_read)
        return loaded_dictionary



    def content_based_recommendation(self,user_profile,top_n=5):
        print("content_based_recommendation")
        df=pd.DataFrame(user_profile)
        recomm_mfs=self.get_recommended_mfs(df,top_n)
        mf_performance=self.mf_details(recomm_mfs)
        return self.get_response(mf_performance)



    def get_recommended_mfs(self,user_profile,top_n):
        # load model
        print("get_recommended_mfs")
        model = load_model(self.MODEL_NAME, compile = False)
        user_data=self.get_formatted_input(user_profile)
        # scaler=MinMaxScaler()
        # user_data=scaler.fit_transform(user_data)
        
        predictions = model.predict(user_data)
        top_n_funds=(-predictions.ravel()).argsort()[:top_n]
        mf_output_mapping = pd.read_pickle(self.MF_OUTPUT_MAPPING,compression="bz2")
        top_funds=mf_output_mapping[mf_output_mapping["scheme_code"].isin(top_n_funds)]["mf_id"].to_list()
        return top_funds




    def mf_details(self,funds):
        print("mf_details")
        mf_df=pd.read_pickle(self.MF_FILE_NAME)
        funds_details=mf_df[mf_df["scheme_code"].isin(funds)]
        funds_details=funds_details[["scheme_code","scheme_name","Risk","fund_name","mf_category","mf_sub_category"]]
        final_df=self.get_performance_data(funds_details["fund_name"],top_n=None)
        return final_df



    def get_performance_data(self,fund_names,mf_category=None,mf_sub_category=None,risk=None,top_n=5,load_cache=True):
        print("get_performance_data")
        df_list=[]
        
        for fund in fund_names:
            df_perf=self.mf_perf.get_mf_details(fund,mf_category,mf_sub_category,risk,top_n,load_cache=True)
            df_list.append(df_perf)
        
        final_df=pd.concat(df_list).reset_index(drop=True)
    
        return final_df


    def get_formatted_input(self,user_data):
        print("get_formatted_input")
        #user_data=pd.read_json("../user_data.json")
        COLUMN_REFERNCE_FILE_NAME="pickle_data/column_reference_for_nn.pkl"
        NN_DATAFRANE_COLUMNS = "pickle_data/final_column_list_for_nn.pkl"
        CATEGORY_WISE_COLUMNS= "pickle_data/column_list_for_nn.pkl"
        
        column_list =self.load_dict(CATEGORY_WISE_COLUMNS)
        nn_column_list =self.load_dict(NN_DATAFRANE_COLUMNS)
        col_dict=self.load_dict(COLUMN_REFERNCE_FILE_NAME)
        
        df_user=pd.DataFrame(columns=nn_column_list)
        
        for col in user_data.columns:
            if col in column_list["numerical"]:
                df_user[col]=user_data[col]
            elif (col in column_list["categorical"]) and  (col in col_dict.keys()):
                column_name=col_dict[col][user_data[col].values[0]]
                df_user[column_name]=1
            df_user.fillna(0,inplace=True)
        
        return df_user


    def get_response(self,df):
        try:
            json = df.to_dict(orient='records')
            return jsonify(json)
        except Exception as ex:
            return self.get_exception_response(ex)
    
    def get_exception_response(self,ex):
        return Response(ex,500)

