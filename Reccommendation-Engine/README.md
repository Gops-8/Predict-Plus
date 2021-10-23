# Predict Plus
## APIs

### Performance Based

> 
> #### https://predict-plus-recommender.herokuapp.com/performance_based
> 
> #### Sample Request : https://predict-plus-recommender.herokuapp.com/performance_based?mf_category=Debt%20Scheme&mf_sub_category=Liquid&risk=Moderate&top_n=5&load_cache=False
> #### Method: GET
> #### Allowed Values : [mf_category_and_sub_category](reference_data\mf_category_and_sub_category.csv), [risk_types](reference_data\risk_types.csv)
> #### Sample Result: 
> 
> ```json
> [{"1-Year Return(%)- Direct":"3.28","1-Year Return(%)- Regular":"3.21","3-Year Return(%)- Direct":"5.10","3-Year Return(%)- Regular":"5.04","5-Year Return(%)- Direct":"5.88","5-Year Return(%)- Regular":"5.81","benchmark":"NIFTY Liquid Fund Index","latest NAV- Direct":"2,325.0887","latest NAV- Regular":"2,311.9423","risk":"Moderate","scheme_name":"Axis Liquid Fund"},{"1-Year Return(%)- Direct":"3.25","1-Year Return(%)- Regular":"3.17","3-Year Return(%)- Direct":"4.98","3-Year Return(%)- Regular":"4.89","5-Year Return(%)- Direct":"5.80","5-Year Return(%)- Regular":"5.71","benchmark":"CRISIL Liquid Fund Index","latest NAV- Direct":"2,408.2207","latest NAV- Regular":"2,388.7586","risk":"Moderate","scheme_name":"BOI AXA Liquid Fund"},{"1-Year Return(%)- Direct":"3.42","1-Year Return(%)- Regular":"3.17","3-Year Return(%)- Direct":"5.19","3-Year Return(%)- Regular":"4.96","5-Year Return(%)- Direct":"5.89","5-Year Return(%)- Regular":"5.70","benchmark":"NIFTY Liquid Fund Index","latest NAV- Direct":"2,702.5092","latest NAV- Regular":"2,668.2378","risk":"Moderate","scheme_name":"Edelweiss Liquid Fund"},{"1-Year Return(%)- Direct":"3.23","1-Year Return(%)- Regular":"3.13","3-Year Return(%)- Direct":"5.01","3-Year Return(%)- Regular":"4.91","5-Year Return(%)- Direct":"5.76","5-Year Return(%)- Regular":"5.65","benchmark":"CRISIL Liquid Fund Index","latest NAV- Direct":"4,116.2249","latest NAV- Regular":"4,085.7339","risk":"Moderate","scheme_name":"HDFC Liquid Fund"},{"1-Year Return(%)- Direct":"2.93","1-Year Return(%)- Regular":"2.88","3-Year Return(%)- Direct":"4.41","3-Year Return(%)- Regular":"4.36","5-Year Return(%)- Direct":"5.25","5-Year Return(%)- Regular":"5.20","benchmark":"CRISIL Liquid Fund Index","latest NAV- Direct":"1,615.7312","latest NAV- Regular":"1,609.3442","risk":"Moderate","scheme_name":"IIFL Liquid Fund"}]
> ```

### Popularity Based

> #### https://predict-plus-recommender.herokuapp.com/popularity_based
> 
> #### Sample GET Request : https://predict-plus-recommender.herokuapp.com/popularity_based?mf_category=Debt%20Scheme&mf_sub_category=Liquid&risk=Moderate&top_n=5&load_cache=False
> #### Method: GET , POST
> #### Sample POST Request : https://predict-plus-recommender.herokuapp.com/popularity_based
> #### Sample Body:
> ``` json
> {"mf_category": "Debt Scheme", "mf_sub_category": "Liquid", "risk": "Moderate", "top_n": 5, "load_cache": "False", "user_mf_data": [{"member_id": 1192831, "mf_id": 144587}, {"member_id": 791766, "mf_id": 142589}, {"member_id": 906393, "mf_id": 117974}, {"member_id": 1044569, "mf_id": 139949}, {"member_id": 254710, "mf_id": 133174}, {"member_id": 1040627, "mf_id": 112495}, {"member_id": 826908, "mf_id": 109831}, {"member_id": 668840, "mf_id": 118317}, {"member_id": 615728, "mf_id": 140874}, {"member_id": 549918, "mf_id": 143504}, {"member_id": 824662, "mf_id": 143159}, {"member_id": 1269741, "mf_id": 142144}, {"member_id": 888956, "mf_id": 143154}, {"member_id": 1035551, "mf_id": 148563}, {"member_id": 855725, "mf_id": 134410}, {"member_id": 919753, "mf_id": 135973}, {"member_id": 998063, "mf_id": 148656}, {"member_id": 1271576, "mf_id": 105559}, {"member_id": 1051800, "mf_id": 128612}, {"member_id": 855725, "mf_id": 129147}, {"member_id": 1247371, "mf_id": 130145}, {"member_id": 350763, "mf_id": 148516}, {"member_id": 1073920, "mf_id": 129021}, {"member_id": 999126, "mf_id": 139761}, {"member_id": 1026182, "mf_id": 128781}, {"member_id": 734013, "mf_id": 145340}, {"member_id": 928336, "mf_id": 112718}, {"member_id": 804940, "mf_id": 147377}, {"member_id": 766849, "mf_id": 118429}, {"member_id": 513879, "mf_id": 130169}, {"member_id": 776031, "mf_id": 119565}]}
> ```
#### Allowed Values : [mf_category_and_sub_category](reference_data\mf_category_and_sub_category.csv), [risk_types](reference_data\risk_types.csv), [user_mf_data](reference_data\user_mf_data.csv)

> #### Sample Result: 
> 
> ```json
> [{"1-Year Return(%)- Direct":"4.21","1-Year Return(%)- Regular":"4.01","3-Year Return(%)- Direct":"4.56","3-Year Return(%)- Regular":"4.38","5-Year Return(%)- Direct":"5.22","5-Year Return(%)- Regular":"5.08","benchmark":"CRISIL Money Market Index","latest NAV- Direct":"3,750.6699","latest NAV- Regular":"3,716.5762","risk":"Moderate","scheme_name":"Tata Money Market Fund"},{"1-Year Return(%)- Direct":"3.23","1-Year Return(%)- Regular":"3.18","3-Year Return(%)- Direct":"5.02","3-Year Return(%)- Regular":"4.97","5-Year Return(%)- Direct":"5.81","5-Year Return(%)- Regular":"5.76","benchmark":"NIFTY Liquid Fund Index","latest NAV- Direct":"2,867.7412","latest NAV- Regular":"2,853.9973","risk":"Moderate","scheme_name":"L&T Liquid Fund"},{"1-Year Return(%)- Direct":"4.99","1-Year Return(%)- Regular":"3.91","3-Year Return(%)- Direct":"4.19","3-Year Return(%)- Regular":"3.16","5-Year Return(%)- Direct":"4.93","5-Year Return(%)- Regular":"3.92","benchmark":"CRISIL Short-Term Bond Index","latest NAV- Direct":"34.4743","latest NAV- Regular":"31.7902","risk":"Moderate","scheme_name":"HSBC Short Duration Fund"},{"1-Year Return(%)- Direct":"3.98","1-Year Return(%)- Regular":"2.82","3-Year Return(%)- Direct":"9.44","3-Year Return(%)- Regular":"8.28","5-Year Return(%)- Direct":"7.45","5-Year Return(%)- Regular":"6.41","benchmark":"CRISIL Composite Bond Index","latest NAV- Direct":"49.5722","latest NAV- Regular":"46.1093","risk":"Moderate","scheme_name":"Canara Robeco Income Fund"},{"1-Year Return(%)- Direct":"1.82","1-Year Return(%)- Regular":"1.04","3-Year Return(%)- Direct":"8.24","3-Year Return(%)- Regular":"7.39","5-Year Return(%)- Direct":"6.33","5-Year Return(%)- Regular":"5.51","benchmark":"CRISIL 10-Year Gilt","latest NAV- Direct":"2,428.4180","latest NAV- Regular":"2,258.8412","risk":"Moderate","scheme_name":"Invesco India Gilt Fund"}]
> ```


### Content Based

> #### https://predict-plus-recommender.herokuapp.com/content_based
> 
> #### Sample Request : https://predict-plus-recommender.herokuapp.com/content_based
> #### Sample Body:
> ``` json
> [{"annual_inc":24000.0,"age":56,"default":0,"loan":0,"housing":0,"amount":16153,"tenure_yr":13,"home_ownership":"RENT","marital":"married","education":"basic.4y","risk":"Moderately High","job":"Others","mf_pref":"Debt Scheme","mf_sub_pref":"Medium to Long Duration","loan_status":"Fully Paid"}]
> ```
> #### Method: POST
> #### Allowed Values : 
> #### Sample Result: 
> 
> ```json
> [{"1-Year Return(%)- Direct":"10.57","1-Year Return(%)- Regular":"10.10","3-Year Return(%)- Direct":"2.60","3-Year Return(%)- Regular":"1.89","5-Year Return(%)- Direct":"3.55","5-Year Return(%)- Regular":"2.81","benchmark":"CRISIL Medium to Long Term Debt Index","latest NAV- Direct":"59.3519","latest NAV- Regular":"55.2060","risk":"Low to Moderate","scheme_name":"UTI Bond Fund"},{"1-Year Return(%)- Direct":"22.47","1-Year Return(%)- Regular":"21.53","3-Year Return(%)- Direct":"-4.88","3-Year Return(%)- Regular":"-5.70","5-Year Return(%)- Direct":"-0.19","5-Year Return(%)- Regular":"-1.16","benchmark":"CRISIL Short Term Credit Risk Index","latest NAV- Direct":"14.8824","latest NAV- Regular":"13.5319","risk":"Moderately High","scheme_name":"UTI Credit Risk Fund"},{"1-Year Return(%)- Direct":"22.47","1-Year Return(%)- Regular":"21.53","3-Year Return(%)- Direct":"-4.88","3-Year Return(%)- Regular":"-5.70","5-Year Return(%)- Direct":"-0.19","5-Year Return(%)- Regular":"-1.16","benchmark":"CRISIL Short Term Credit Risk Index","latest NAV- Direct":"14.8824","latest NAV- Regular":"13.5319","risk":"Moderately High","scheme_name":"UTI Credit Risk Fund"},{"1-Year Return(%)- Direct":"22.47","1-Year Return(%)- Regular":"21.53","3-Year Return(%)- Direct":"-4.88","3-Year Return(%)- Regular":"-5.70","5-Year Return(%)- Direct":"-0.19","5-Year Return(%)- Regular":"-1.16","benchmark":"CRISIL Short Term Credit Risk Index","latest NAV- Direct":"14.8824","latest NAV- Regular":"13.5319","risk":"Moderately High","scheme_name":"UTI Credit Risk Fund"},{"1-Year Return(%)- Direct":"59.90","1-Year Return(%)- Regular":"58.28","3-Year Return(%)- Direct":"24.03","3-Year Return(%)- Regular":"22.62","5-Year Return(%)- Direct":"14.82","5-Year Return(%)- Regular":"13.49","benchmark":"S&P BSE 250 Large MidCap Total Return Index","latest NAV- Direct":"63.0200","latest NAV- Regular":"57.1100","risk":"Low to Moderate","scheme_name":"BOI AXA Large & Mid Cap Equity Fund"}]
> ```


### Collboration Based

> #### https://predict-plus-recommender.herokuapp.com/collab_based
> 
> #### Sample Request : https://predict-plus-recommender.herokuapp.com/collab_based
> #### Sample Body:
> ``` json
> {"mf_list": [148627, 148629]}
> ```
> #### Method: POST
> #### Allowed Values : 
> #### Sample Result: 
> 
> ```json
> [{"1-Year Return(%)- Direct":"10.57","1-Year Return(%)- Regular":"10.10","3-Year Return(%)- Direct":"2.60","3-Year Return(%)- Regular":"1.89","5-Year Return(%)- Direct":"3.55","5-Year Return(%)- Regular":"2.81","benchmark":"CRISIL Medium to Long Term Debt Index","latest NAV- Direct":"59.3519","latest NAV- Regular":"55.2060","risk":"Low to Moderate","scheme_name":"UTI Bond Fund"},{"1-Year Return(%)- Direct":"22.47","1-Year Return(%)- Regular":"21.53","3-Year Return(%)- Direct":"-4.88","3-Year Return(%)- Regular":"-5.70","5-Year Return(%)- Direct":"-0.19","5-Year Return(%)- Regular":"-1.16","benchmark":"CRISIL Short Term Credit Risk Index","latest NAV- Direct":"14.8824","latest NAV- Regular":"13.5319","risk":"Moderately High","scheme_name":"UTI Credit Risk Fund"},{"1-Year Return(%)- Direct":"22.47","1-Year Return(%)- Regular":"21.53","3-Year Return(%)- Direct":"-4.88","3-Year Return(%)- Regular":"-5.70","5-Year Return(%)- Direct":"-0.19","5-Year Return(%)- Regular":"-1.16","benchmark":"CRISIL Short Term Credit Risk Index","latest NAV- Direct":"14.8824","latest NAV- Regular":"13.5319","risk":"Moderately High","scheme_name":"UTI Credit Risk Fund"},{"1-Year Return(%)- Direct":"22.47","1-Year Return(%)- Regular":"21.53","3-Year Return(%)- Direct":"-4.88","3-Year Return(%)- Regular":"-5.70","5-Year Return(%)- Direct":"-0.19","5-Year Return(%)- Regular":"-1.16","benchmark":"CRISIL Short Term Credit Risk Index","latest NAV- Direct":"14.8824","latest NAV- Regular":"13.5319","risk":"Moderately High","scheme_name":"UTI Credit Risk Fund"},{"1-Year Return(%)- Direct":"59.90","1-Year Return(%)- Regular":"58.28","3-Year Return(%)- Direct":"24.03","3-Year Return(%)- Regular":"22.62","5-Year Return(%)- Direct":"14.82","5-Year Return(%)- Regular":"13.49","benchmark":"S&P BSE 250 Large MidCap Total Return Index","latest NAV- Direct":"63.0200","latest NAV- Regular":"57.1100","risk":"Low to Moderate","scheme_name":"BOI AXA Large & Mid Cap Equity Fund"}]
> ```



### User Score

> #### https://predict-plus-recommender.herokuapp.com/user_score
> 
> #### Sample Request : https://predict-plus-recommender.herokuapp.com/user_score
> #### Sample Body:
> ``` json
> [{"member_id":89243,"last_payment_date":"2008-01-01","first_loan_start_date":"1988-11-01","open_acc":17,"loan_payment_till_date":100,"total_loan":650,"account_balance":2932704.5,"mf_details":"[{\"mutual_fund_id\":121145,\"mutual_fund_amount\":6310,\"months_since_default\":22,\"mutual_fund_return\":1243070.0,\"mutual_fund_held_since\":14,\"mutual_fund_risk\":\"Moderate\",\"mutual_fund_category\":\"Others\"},{\"mutual_fund_id\":120391,\"mutual_fund_amount\":12790,\"months_since_default\":22,\"mutual_fund_return\":121505.0,\"mutual_fund_held_since\":17,\"mutual_fund_risk\":\"Moderate\",\"mutual_fund_category\":\"Debt Scheme\"},{\"mutual_fund_id\":129736,\"mutual_fund_amount\":13966,\"months_since_default\":22,\"mutual_fund_return\":11731.44,\"mutual_fund_held_since\":16,\"mutual_fund_risk\":\"Moderate\",\"mutual_fund_category\":\"Others\"},{\"mutual_fund_id\":128989,\"mutual_fund_amount\":12503,\"months_since_default\":22,\"mutual_fund_return\":1762923.0,\"mutual_fund_held_since\":10,\"mutual_fund_risk\":\"Moderate\",\"mutual_fund_category\":\"Others\"},{\"mutual_fund_id\":147866,\"mutual_fund_amount\":17539,\"months_since_default\":22,\"mutual_fund_return\":1701283.0,\"mutual_fund_held_since\":12,\"mutual_fund_risk\":\"Moderate\",\"mutual_fund_category\":\"Others\"},{\"mutual_fund_id\":148266,\"mutual_fund_amount\":19310,\"months_since_default\":22,\"mutual_fund_return\":1255150.0,\"mutual_fund_held_since\":8,\"mutual_fund_risk\":\"Moderate\",\"mutual_fund_category\":\"Hybrid Scheme\"},{\"mutual_fund_id\":129330,\"mutual_fund_amount\":4278,\"months_since_default\":22,\"mutual_fund_return\":551862.0,\"mutual_fund_held_since\":16,\"mutual_fund_risk\":\"Moderate\",\"mutual_fund_category\":\"Others\"},{\"mutual_fund_id\":146609,\"mutual_fund_amount\":11551,\"months_since_default\":22,\"mutual_fund_return\":11551.0,\"mutual_fund_held_since\":13,\"mutual_fund_risk\":\"Moderate\",\"mutual_fund_category\":\"Others\"},{\"mutual_fund_id\":126399,\"mutual_fund_amount\":6300,\"months_since_default\":22,\"mutual_fund_return\":5859.0,\"mutual_fund_held_since\":7,\"mutual_fund_risk\":\"Moderate\",\"mutual_fund_category\":\"Others\"},{\"mutual_fund_id\":128924,\"mutual_fund_amount\":15075,\"months_since_default\":22,\"mutual_fund_return\":1100475.0,\"mutual_fund_held_since\":9,\"mutual_fund_risk\":\"Moderate\",\"mutual_fund_category\":\"Others\"},{\"mutual_fund_id\":144337,\"mutual_fund_amount\":13875,\"months_since_default\":22,\"mutual_fund_return\":3898875.0,\"mutual_fund_held_since\":14,\"mutual_fund_risk\":\"Moderate\",\"mutual_fund_category\":\"Debt Scheme\"},{\"mutual_fund_id\":125328,\"mutual_fund_amount\":10910,\"months_since_default\":22,\"mutual_fund_return\":9600.8,\"mutual_fund_held_since\":12,\"mutual_fund_risk\":\"Moderate\",\"mutual_fund_category\":\"Others\"},{\"mutual_fund_id\":146595,\"mutual_fund_amount\":3192,\"months_since_default\":22,\"mutual_fund_return\":20748.0,\"mutual_fund_held_since\":11,\"mutual_fund_risk\":\"Moderate\",\"mutual_fund_category\":\"Others\"},{\"mutual_fund_id\":107525,\"mutual_fund_amount\":19538,\"months_since_default\":22,\"mutual_fund_return\":18561.1,\"mutual_fund_held_since\":5,\"mutual_fund_risk\":\"Moderate\",\"mutual_fund_category\":\"Others\"},{\"mutual_fund_id\":143433,\"mutual_fund_amount\":14459,\"months_since_default\":2,\"mutual_fund_return\":2212227.0,\"mutual_fund_held_since\":1,\"mutual_fund_risk\":\"Moderate\",\"mutual_fund_category\":\"Others\"},{\"mutual_fund_id\":118318,\"mutual_fund_amount\":16057,\"months_since_default\":22,\"mutual_fund_return\":15254.15,\"mutual_fund_held_since\":5,\"mutual_fund_risk\":\"Moderate\",\"mutual_fund_category\":\"Debt Scheme\"}]"}]
> ```
> #### Method: POST
> #### Allowed Values : 
> #### Sample Result: 
> 
> ```json
> {
>  "improve": [
>    "Its good to invest the mutual funds for a longer period to get the power of compound interest",
>    "Try to invest for more time and more funds, to get higher returns using the power of compound interest"
>  ],
>  "max_score": "700",
>  "score": 266
> }
> ```
