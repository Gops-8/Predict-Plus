import pandas as pd
import numpy as np
import sklearn
from sklearn.decomposition import TruncatedSVD
import pickle
from mf_performance_details import mf_performance
import warnings
from flask import jsonify
from flask import request, make_response,Response
warnings.filterwarnings("ignore")

class collab_based_recommend():

    def __init__(self):
        self.mf_perf=mf_performance()

    def load_dict(self,file_name):
        print("load_dict")
        file_to_read = open(file_name, "rb")
        loaded_dictionary = pickle.load(file_to_read)
        return loaded_dictionary

    def flatten(self,t):
            return [item for sublist in t for item in sublist]



    def save_obj(self,obj_data,file_name):
        print("save_obj")
        f = open(file_name,"wb")
        # write the python object (dict) to pickle file
        pickle.dump(obj_data,f)
        # close file
        f.close()

    def load_obj(self,file_name):
        print("load_obj")
        file_to_read = open(file_name, "rb")
        obj_data = pickle.load(file_to_read)
        return obj_data
        


    def get_collaboration_based_funds(self,current_mf_holdings,user_data_json=None,top_n=5,load_cache=True):
        try:
            print("get_collaboration_based_funds")
            USER_MF_DATA="pickle_data/user_mf_buy_details.pkl.bz2"
            if load_cache:
                user_df=pd.read_pickle(USER_MF_DATA)
                #user_df=user_df.sample(frac=0.3)
            else:
                user_df=pd.read_json(user_data_json)
                user_df=user_df[["member_id","mf_id"]].drop_duplicates()
            corr_data=self.correlation_data(user_df)        
            collab_matrix=self.calculate_collaboration(corr_data)
            suggested_mf= self.get_suggested_funds(current_mf_holdings,collab_matrix,corr_data)[:top_n]
            result=self.mf_details(suggested_mf)
            return self.get_response(result)
        except Exception as ex:
            return self.get_exception_response("Exception Occured:"+ex) 


    def get_suggested_funds(self,current_mf_holdings,collab_matrix,corr_data):
        print("get_suggested_funds")
        list_recomm_mfs=[]
        mf_names = corr_data.columns
        mf_list = list(mf_names)
        print(current_mf_holdings)
        for mf in current_mf_holdings:
            mf_idx=mf_list.index(mf)
            mfid=collab_matrix[mf_idx]
            suggested_mf=list(mf_names[(mfid<1.0) & (mfid > 0.9)])
            list_recomm_mfs.append(suggested_mf)
        final_mfs=list(set(self.flatten(list_recomm_mfs)))
        final_mfs = [e for e in final_mfs if e not in current_mf_holdings]
        return final_mfs



    def correlation_data(self,user_data):

        print("correlation_data")
        user_data["buy"]=1
        corr_data=user_data.pivot_table(values="buy",index="member_id",columns="mf_id", fill_value=0)    
        return corr_data


    def calculate_collaboration(self,correlation_data):
        print("calculate_collaboration")
        X = correlation_data.T
        ### Decomposing the Matrix
        SVD = TruncatedSVD(n_components=12, random_state=17)
        resultant_matrix = SVD.fit_transform(X)
        ### Generating a Correlation Matrix
        collab_matrix = np.corrcoef(resultant_matrix) 
        return collab_matrix


    def mf_details(self,funds):
        print("mf_details")
        mf_df=pd.read_pickle("pickle_data/mf_data_popular.pkl.bz2",compression="bz2")
        funds_details=mf_df[mf_df["scheme_code"].isin(funds)]
        funds_details=list(set(funds_details["fund_name"].values))[:5]
        final_df=self.get_performance_data(funds_details)
        return final_df



    def get_performance_data(self,fund_names):
        print("get_performance_data")
        mf_perf=mf_performance()
        df_list=[]
        
        for fund in fund_names:
            df_perf=mf_perf.get_mf_details(fund)
            
            df_list.append(df_perf)
        final_df=pd.concat(df_list).reset_index(drop=True)
        #final_df["risk"]= final_df["scheme_name"].apply(lambda x: mf_perf.get_mf_risk(x))
        return final_df


    def get_response(self,df):
        print("get_response")
        try:
            json = df.to_dict(orient='records')
            return jsonify(json)
        except Exception as ex:
            return self.get_exception_response(ex)
    
    def get_exception_response(self,ex):
        return Response(ex,500)




