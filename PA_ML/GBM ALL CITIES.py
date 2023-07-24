#!/usr/bin/env python
# coding: utf-8

# In[1]:


import os
import pandas as pd
import numpy as np
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.metrics import mean_squared_error


# In[2]:


df = pd.read_csv('C:/Users/abdel/Downloads/temperature-quotidienne-departementale.csv', sep=';')
df['date_obs'] = pd.to_datetime(df['date_obs'])
cities = df['code_insee_departement'].unique()


# In[3]:


param_grid = {'n_estimators': [100, 200, 300], 'learning_rate': [0.01, 0.1, 1], 'max_depth': [3, 4, 5]}
os.makedirs('forecast_data', exist_ok=True)


# In[4]:


for city in cities:
    print(f"Processing city {city}")
    df_city = df[df['code_insee_departement'] == city]
    for temp_var in ['tmoy', 'tmin', 'tmax']:
        print(f"Processing variable {temp_var}")
        df_city_var = df_city.groupby('date_obs')[temp_var].mean().reset_index()
        new_column = df_city_var[['date_obs', temp_var]]
        new_column.dropna(inplace=True)
        new_column.columns = ['ds', 'y']
        new_column['year'] = new_column['ds'].dt.year
        new_column['month'] = new_column['ds'].dt.month
        new_column['day_of_year'] = new_column['ds'].dt.dayofyear
        new_column['day_of_week'] = new_column['ds'].dt.dayofweek
        X_gbm = new_column[['year', 'month', 'day_of_year', 'day_of_week']]
        y_gbm = new_column['y']
        X_train, X_test, y_train, y_test = train_test_split(X_gbm, y_gbm, test_size=0.2, random_state=42)
        model_gbm = GradientBoostingRegressor(random_state=42)
        grid_search = GridSearchCV(model_gbm, param_grid, cv=5, scoring='neg_root_mean_squared_error')
        grid_search.fit(X_train, y_train)
        best_params = grid_search.best_params_
        model_gbm_best = GradientBoostingRegressor(**best_params, random_state=42)
        model_gbm_best.fit(X_train, y_train)
        future_dates = pd.date_range(new_column['ds'].iloc[-1] + pd.DateOffset(days=1), periods=500, freq='D')
        future_df = pd.DataFrame()
        future_df['ds'] = future_dates
        future_df['year'] = future_df['ds'].dt.year
        future_df['month'] = future_df['ds'].dt.month
        future_df['day_of_year'] = future_df['ds'].dt.dayofyear
        future_df['day_of_week'] = future_df['ds'].dt.dayofweek
        forecast_gbm_best = model_gbm_best.predict(future_df[['year', 'month', 'day_of_year', 'day_of_week']])
        forecast_df = pd.DataFrame({'date': future_dates, temp_var: forecast_gbm_best})
        forecast_df.to_csv(f'forecast_data/{city}_{temp_var}_forecast.csv', index=False)
        print(f"Finished processing variable {temp_var}")
    print(f"Finished processing city {city}")


# In[ ]:




