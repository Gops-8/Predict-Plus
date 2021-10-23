"""
Created on 10/10/2021
@author: Gopal Padhi
"""

from flask import Flask,jsonify,request
import numpy as np
import pandas as pd
import flasgger
from flasgger import Swagger
from sklearn.metrics import mean_squared_error
from math import sqrt
from nsepy import get_history
import datetime as dt
from datetime import date
import calendar
import warnings
warnings.simplefilter('ignore')
import math
from fbprophet import Prophet
from sklearn.metrics import mean_squared_error, mean_absolute_error
# plt.style.use('fivethirtyeight')
from fbprophet.plot import plot_plotly, plot_components_plotly
from fbprophet.diagnostics import cross_validation
from datetime import date, datetime, time, timedelta
from dateutil.relativedelta import relativedelta
import itertools
from fbprophet.diagnostics import performance_metrics
import json


app=Flask(__name__)
Swagger(app)


@app.route('/')
def welcome():
    return "Forcaster HomePage"


@app.route('/predict',methods=["Get"])
def predict():
    
    """Forcaster
    Forcasting Future stock Prices   
    ---
    parameters:  
      - name: stockname
        in: query
        type: string
        required: true
      - name: numdays
        in: query
        type: number
        required: true
    responses:
        200:
            description: The output values
        
    """
    stockname=request.args.get("stockname")
    numdays=request.args.get("numdays")    
    
    
    result=get_stock_price(stockname,numdays)    
    data_dict = dict()
    for col in result.columns:                
        data_dict[col] = result[col].values.tolist()
        
    return jsonify(data_dict)

    
def get_stock_price(stockname,numdays):
    name = stockname
#     print("Predicting for Stock",name)
    curr_date=date.today()
    starting_date=curr_date-timedelta(1000)
    ending_date=curr_date
    
#     print("Training from",starting_date)

    data = get_history(symbol=name, start=starting_date, end=ending_date)           ##INSERT
    data = data.reset_index()
    data['Date'] = pd.to_datetime(data['Date'], errors='coerce')
    value_on_prediction='Close'
    value_on_prediction = str(value_on_prediction)
    data[value_on_prediction] = data[value_on_prediction].apply(lambda x: float(x)) # INSERT Whether opening or closing
    data2 = data[['Date',value_on_prediction]]
    data2.columns = ['ds','y']

    rmse=[]
    num_days = numdays
    num_days= int(num_days)
    print('Testing Period is for',num_days,' days')

    model = Prophet()
    model.fit(data2)                                                                # Fit model with basic params

    df_cv = cross_validation(model, horizon='30 days', parallel="processes")
    df_p = performance_metrics(df_cv, rolling_window=1)
    rmse.append(df_p['rmse'][0])

    #     tuning_results = pd.DataFrame(all_params)
    #     tuning_results['rmse'] = rmses
    print('RMSE= ',rmse)

    #Prediction of Future Data
    future = model.make_future_dataframe(periods=num_days)
    future.tail()

    #using forecasting object
    forecast = model.predict(future)
    forecast=forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']]
    forecast['ds']=forecast['ds'].astype(str)
    forecasting_values = forecast.tail(num_days)

    return forecasting_values

    
if __name__=='__main__':    
    
    app.run(host='0.0.0.0',port=8000)
    

