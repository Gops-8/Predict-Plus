import pandas as pd
from mftool import Mftool
import pickle
from os.path import exists
import numpy as np
import warnings
from difflib import SequenceMatcher
from flask import jsonify
from flask import request, make_response,Response
warnings.filterwarnings("ignore")

class mf_performance():

    def __init__(self):
        self.mf_df=pd.read_pickle("pickle_data/mf_data_popular.pkl.bz2",compression="bz2")
        self.mf = Mftool()
        self.top_equity=None
        self.top_debt=None
        self.top_hybrid=None
        self.top_soln=None
        self.top_other=None
        self.mf_perform_data=None
        self.top_all=None
        self.default_result=pd.DataFrame(columns=['scheme_name', 'benchmark', 'latest NAV- Regular', 'latest NAV- Direct',\
       '1-Year Return(%)- Regular', '1-Year Return(%)- Direct',\
       '3-Year Return(%)- Regular', '3-Year Return(%)- Direct',\
       '5-Year Return(%)- Regular', '5-Year Return(%)- Direct'])
    
    def flatten(self,t):
        return [item for sublist in t for item in sublist]
    
    def save_dict(self,dict_data,file_name):
        f = open(file_name,"wb")
            # write the python object (dict) to pickle file
        pickle.dump(dict_data,f)
        # close file
        f.close()

    def load_dict(self,file_name):
        file_to_read = open(file_name, "rb")
        loaded_dictionary = pickle.load(file_to_read)
        return loaded_dictionary
    
    def get_response(self,df):
        try:
            json = df.to_dict(orient='records')
            return jsonify(json)
        except Exception as ex:
            return self.get_exception_response(ex)
    
    def get_exception_response(self,ex):
        return Response(ex,500)
    
    def performance_based_recommendation(self,mf_category=None,mf_sub_category=None,risk=None,top_n=5,load_cache=True):
        try:
            result=self.mutual_fund_performance(mf_category,mf_sub_category,risk,top_n,load_cache)
            return self.get_response(result)
        except Exception as ex:
            return self.get_exception_response("Error occured, please try again. Exception-"+str(ex))                        
    

    def get_mf_risk(self,scheme_name):
        mf_df=pd.read_pickle("pickle_data/fund_risk_score.pkl.bz2")
        risk_list=['Low to Moderate', 'Moderate', 'Moderately High', 'Very High', 'High', 'Low']  
        mf_risk_score= mf_df[mf_df["fund_name"].str.lower().str.strip()==str(scheme_name).strip().lower()]["risk"].head(1).to_list()
        
        if mf_risk_score:
            
            return str(mf_risk_score[0])
        else:
            risk_score=np.random.choice(risk_list)
            
            return risk_score

    def mutual_fund_performance(self,mf_category=None,mf_sub_category=None,risk=None,top_n=5,load_cache=True):
            top_funds=None
            if mf_category=="Equity Scheme":
                top_funds=self.get_equity_performance_based_funds(mf_sub_category,load_cache)
            elif mf_category  =="Debt Scheme":
                top_funds=self.get_debt_performance_based_funds(mf_sub_category,load_cache)
            elif mf_category  =="Hybrid Scheme":
                top_funds=self.get_hybrid_performance_based_funds(mf_sub_category,load_cache)
            elif mf_category  =="Solution Scheme":
                top_funds=self.get_soln_performance_based_funds(mf_sub_category,load_cache)    
            elif mf_category =="Other Scheme":
                top_funds=self.get_soln_performance_based_funds(mf_sub_category,load_cache)
            else:
                ALL_MF_FILE_NAME="pickle_data/all_schemes.pkl.bz2"
                if load_cache:
                    if self.top_all is None:                        
                        if exists(ALL_MF_FILE_NAME):
                            self.top_all= pd.read_pickle(ALL_MF_FILE_NAME,compression="bz2")
                            top_funds=self.top_all 
                else:        
                    top_funds1=self.get_equity_performance_based_funds(mf_sub_category,load_cache)
                    top_funds2=self.get_debt_performance_based_funds(mf_sub_category,load_cache)
                    top_funds3=self.get_hybrid_performance_based_funds(mf_sub_category,load_cache)
                    top_funds4=self.get_soln_performance_based_funds(mf_sub_category,load_cache)  
                    top_funds5=self.get_other_performance_based_funds(mf_sub_category,load_cache)
                    top_funds= pd.concat([top_funds1,top_funds2,top_funds3,top_funds4,top_funds5])
                    
                    self.top_all=top_funds
                    top_funds.to_pickle(ALL_MF_FILE_NAME,compression="bz2")                   
            
            top_funds["risk"]= top_funds["scheme_name"].apply(lambda x: self.get_mf_risk(x))
            if risk is None:
                return top_funds.head(top_n)
            else:
                return top_funds[top_funds["risk"]==risk].head(top_n)
            

    def get_equity_performance_based_funds(self,mf_sub_category=None,load_cache=True):
        FILE_NAME="pickle_data/top_equity.pkl"
        
        if self.top_equity is None:
            try:
                if load_cache:
                    if exists(FILE_NAME):
                        self.top_equity= self.load_dict(FILE_NAME)
                else:
                    self.top_equity=self.mf.get_open_ended_equity_scheme_performance(as_json=False)
                    self.save_dict(self.top_equity,FILE_NAME)            
            except Exception as ex:
                if exists(FILE_NAME):
                    self.top_equity= self.load_dict(FILE_NAME)
                else:
                    print("Network Error")
                    
        if self.top_equity is None:
            return self.default_result

        if mf_sub_category is None:
            return pd.DataFrame(self.flatten(list(self.top_equity.values())))
        else:
            return pd.DataFrame(self.top_equity[mf_sub_category])

    def get_debt_performance_based_funds(self,mf_sub_category=None,load_cache=True):
        FILE_NAME="pickle_data/top_debt.pkl"
        
        if self.top_debt is None:
            try:
                if load_cache:
                    if exists(FILE_NAME):
                        self.top_debt= self.load_dict(FILE_NAME)
                else:
                    self.top_debt=self.mf.get_open_ended_debt_scheme_performance(as_json=False)
                    self.save_dict(self.top_debt,FILE_NAME)                     
            except Exception as ex:
                if exists(FILE_NAME):
                    self.top_debt= self.load_dict(FILE_NAME)
                else:
                    print("Network Error")
        if self.top_debt is None:
            return self.default_result
        if mf_sub_category is None:
            return pd.DataFrame(self.flatten(list(self.top_debt.values())))
        else:
            return pd.DataFrame(self.top_debt[mf_sub_category])


    def get_hybrid_performance_based_funds(self,mf_sub_category=None,load_cache=True):
        FILE_NAME="pickle_data/top_hybrid.pkl"
        
        if self.top_hybrid is None:
            try:
                if load_cache:
                    if exists(FILE_NAME):
                        self.top_hybrid= self.load_dict(FILE_NAME)
                else:
                    self.top_hybrid=self.mf.get_open_ended_hybrid_scheme_performance(as_json=False)
                    self.save_dict(self.top_hybrid,FILE_NAME)             
            except Exception as ex:
                if exists(FILE_NAME):
                    self.top_hybrid= self.load_dict(FILE_NAME)
                else:
                    print("Network Error")
        if self.top_hybrid is None:
            return self.default_result

        if mf_sub_category is None:            
            for key in list(self.top_hybrid.keys()):
                if "The underlying data is unavailable for Today" in self.top_hybrid[key]:
                    del self.top_hybrid[key]
            return pd.DataFrame(self.flatten(list(self.top_hybrid.values())))
        else:
            return pd.DataFrame(self.top_hybrid[mf_sub_category])


    def get_soln_performance_based_funds(self,mf_sub_category=None,load_cache=True):
        FILE_NAME="pickle_data/top_soln.pkl"
        
        if self.top_soln is None:
            try: 
                
                if load_cache:
                    
                    if exists(FILE_NAME):
                        self.top_soln= self.load_dict(FILE_NAME)
                else:
                    self.top_soln=self.mf.get_open_ended_solution_scheme_performance(as_json=False)
                    self.save_dict(self.top_soln,FILE_NAME)        
            except Exception as ex:
                if exists(FILE_NAME):
                    self.top_soln= self.load_dict(FILE_NAME)
                else:
                    print("Network Error")
        if self.top_soln is None:
            return self.default_result
        if mf_sub_category is None:                
            return pd.DataFrame(self.flatten(list(self.top_soln.values())))
        else:
            return pd.DataFrame(self.top_soln[mf_sub_category])


    def get_other_performance_based_funds(self,mf_sub_category=None,load_cache=True):
        FILE_NAME="pickle_data/top_other.pkl"
        
        if self.top_other is None:
            try:
                if load_cache:
                    if exists(FILE_NAME):
                        self.top_other= self.load_dict(FILE_NAME)
                else:
                    self.top_other=self.mf.get_open_ended_other_scheme_performance(as_json=False)
                    self.save_dict(self.top_other,FILE_NAME)            
            except Exception as ex:
                if exists(FILE_NAME):
                    self.top_other= self.load_dict(FILE_NAME)
                else:
                    print("Network Error")
        if mf_sub_category is None:
            return pd.DataFrame(self.flatten(list(self.top_other.values())))
        else:
            return pd.DataFrame(self.top_other[mf_sub_category])

    def get_mf_details(self,scheme_name,mf_category=None,mf_sub_category=None,risk=None,top_n=None,load_cache=True):
        selected_mf=None
        selected_ratio=-1
        result=pd.DataFrame(columns=['scheme_name', 'benchmark', 'latest NAV- Regular', 'latest NAV- Direct',\
       '1-Year Return(%)- Regular', '1-Year Return(%)- Direct',\
       '3-Year Return(%)- Regular', '3-Year Return(%)- Direct',\
       '5-Year Return(%)- Regular', '5-Year Return(%)- Direct'])
        if self.mf_perform_data is None:
            self.mf_perform_data=self.mutual_fund_performance(mf_category,mf_sub_category,risk,top_n,load_cache)
        
        for mf in self.mf_perform_data["scheme_name"]:
            
            if scheme_name.lower() == mf.lower():
                ratio=100
            else:
                ratio=SequenceMatcher(a=scheme_name.lower(),b=mf.lower()).ratio()
            if ratio >selected_ratio:
                selected_ratio=ratio
                selected_mf=mf 
                if selected_ratio==100:
                    break
        
        if selected_ratio>-1:
            result=self.mf_perform_data[self.mf_perform_data["scheme_name"]==selected_mf].drop_duplicates()
            
        return result
