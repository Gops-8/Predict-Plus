import pandas as pd
from mftool import Mftool
import pickle
from os.path import exists
import numpy as np
import warnings
from difflib import SequenceMatcher
from flask import jsonify
from flask import request, make_response,Response
import pandas as pd
from mf_performance_details import mf_performance
warnings.filterwarnings("ignore")

class mf_popularity():

    def __init__(self):
        self.mf_df=pd.read_pickle("pickle_data/mf_data_popular.pkl.bz2",compression="bz2")
        self.mf_perf=mf_performance()
        
    
    def get_response(self,df):
        try:
            json = df.to_dict(orient='records')
            return jsonify(json)
        except Exception as ex:
            return self.get_exception_response(ex)
    
    def get_exception_response(self,ex):
        return Response(ex,500)
    
    def popularity_based_recommendation(self,mf_category=None,mf_sub_category=None,risk=None,top_n=5,load_cache=True,user_mf_json=None):
        try:
            result=self.get_popularity_based_funds(mf_category,mf_sub_category,risk,top_n,load_cache,user_mf_json)
            return self.get_response(result)
        except Exception as ex:
            return self.get_exception_response("Error occured, please try again. Exception-"+str(ex))                        
    
        
    def get_popularity_based_funds(self,mf_category=None,mf_sub_category=None,risk=None,top_n=5,load_cache=True,user_mf_json=None):
        FILE_NAME="pickle_data/mf_data_popular.pkl.bz2"
        
        if load_cache==True:
            if self.mf_df is None:
                self.mf_df=pd.read_pickle(FILE_NAME,compression="bz2")
        else:
            mf_df=self.calculate_popularity(FILE_NAME,user_mf_json)
        filter_df= self.mf_df.copy(deep=True)
        if mf_category is not None:
            filter_df=filter_df[filter_df["mf_category"]==mf_category]
        if mf_sub_category is not None:
            filter_df=filter_df[filter_df["mf_sub_category"]==mf_sub_category]
                
        print("risk",risk)
        if risk is not None:        
            filter_df["risk_score"]= filter_df["fund_name"].apply(lambda x: self.mf_perf.get_mf_risk(x))    
            suggested_mf=list(set(filter_df[filter_df["risk_score"]==risk]["fund_name"]))[:top_n] 
        else:
            suggested_mf=list(set(filter_df["fund_name"]))[:top_n]
        result=self.get_performance_data(suggested_mf,mf_category,mf_sub_category,risk,None,load_cache)
        if risk is not None:
            result["risk"]=risk
        
        return result.head(top_n)
        
    def calculate_popularity(self,mf_data_file,user_mf_json):
        
        if self.mf_df is None:
            self.mf_df=pd.read_pickle(mf_data_file,compression="bz2") 
        if user_mf_json is None:
            return self.mf_df
        user_df=pd.read_json(user_mf_json)
        for index,mf in self.mf_df["scheme_code"].items():
            self.mf_df["popularity"].iloc[index]=len(user_df[user_df["mf_id"]==mf])
        self.mf_df['rank'] = self.mf_df['popularity'].rank(ascending = 0, method = 'first')
        return self.mf_df

    def get_performance_data(self,fund_names,mf_category=None,mf_sub_category=None,risk=None,top_n=5,load_cache=True):
        
        df_list=[]
        
        for fund in fund_names:
            df_perf=self.mf_perf.get_mf_details(fund,mf_category,mf_sub_category,risk,top_n,load_cache)
            df_list.append(df_perf)

        final_df=pd.concat(df_list).reset_index(drop=True)
        
        return final_df
