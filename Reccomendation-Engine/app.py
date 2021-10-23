from mf_performance_details import mf_performance
from mf_popularity_details import mf_popularity
from user_content_based_mf import content_based_recommend
from user_collab_based_mf import collab_based_recommend
from user_scoring_model import user_score
from flask import Flask,jsonify,request
# from flasgger import Swagger

app=Flask(__name__)
# Swagger(app)


@app.route('/')
def welcome():
    return "Predict Plus Mutual Fund Recommender"

@app.route('/performance_based',methods=["Get"])
def performace_based_recommendation():
    
    mf_category=request.args.get("mf_category")
    mf_sub_category=request.args.get("mf_sub_category")
    risk=request.args.get("risk")
    top_n=int(request.args.get("top_n"))
    load_cache=bool(request.args.get("load_cache"))
    
    mf_perform=mf_performance()
    return mf_perform.performance_based_recommendation(mf_category,mf_sub_category,risk,top_n,load_cache)

@app.route('/popularity_based',methods=["GET","POST"])
def popularity_based_recommendation():
    if request.method == 'GET':
      mf_category=request.args.get("mf_category")
      mf_sub_category=request.args.get("mf_sub_category")
      risk=request.args.get("risk")
      if request.args.get("top_n") is not None:
          top_n=int(request.args.get("top_n"))
      else :
          top_n=5
      load_cache=bool(request.args.get("load_cache"))
    if request.method == 'POST':
      data = request.get_json()
      mf_category=data["mf_category"]
      mf_sub_category=data["mf_sub_category"]
      risk=data["risk"]
      top_n=data["top_n"]
      load_cache=data["load_cache"]
      
    print(mf_category,mf_sub_category,risk,top_n,load_cache)

    mf_popular=mf_popularity()
    return mf_popular.popularity_based_recommendation(mf_category,mf_sub_category,risk,top_n,load_cache)


@app.route('/user_score', methods=['POST'])
def user_score_details():
  data = request.get_json()
  
  score=user_score()
  return score.get_scoring_result(data)


@app.route('/content_based', methods=['POST'])
def content_based_mf_recommend():
  data = request.get_json()
  
  content_recommend=content_based_recommend()
  return content_recommend.content_based_recommendation(data)

@app.route('/collab_based', methods=['POST'])
def collab_based_mf_recommend():
  data = request.get_json()
  print(data)
  collab_based=collab_based_recommend()
  mf_list=data["mf_list"]
  print(mf_list)
  return collab_based.get_collaboration_based_funds(mf_list)

if __name__=='__main__':    
    app.run(host='0.0.0.0',port=8000,debug=False)
