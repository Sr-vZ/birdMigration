import plotly
import plotly.graph_objs as go
import pandas as pd

# plotly.offline.plot({
#     "data": [go.Scatter(x=[1, 2, 3, 4], y=[4, 3, 2, 1])],
#     "layout": go.Layout(title="hello world")
# }, auto_open=True)

# pk.eyJ1IjoibnVyaXZ1IiwiYSI6ImNqdTd1eml1ZjF5YzgzeXJ2OTN3c2JtbnIifQ.1a_wcAP-vDxPkriLxoKGBA

mapbox_access_token = 'pk.eyJ1IjoibnVyaXZ1IiwiYSI6ImNqdTd1eml1ZjF5YzgzeXJ2OTN3c2JtbnIifQ.1a_wcAP-vDxPkriLxoKGBA'

df = pd.read_excel('position_info_62870.xlsx')
# site_lat = df.lat
# site_lon = df.lon
print(df)
site_lat = df["ais_position_latitude"]
site_lon = df["ais_position_longitude"]
# locations_name = df.text

data = [
    go.Scattermapbox(
        lat=site_lat,
        lon=site_lon,
        mode='markers',
        marker=go.scattermapbox.Marker(
            size=5,
            color='rgb(255, 0, 0)',
            opacity=0.7
        ),
        # text=locations_name,
        hoverinfo='text'
    ),
    go.Scattermapbox(
        lat=site_lat,
        lon=site_lon,
        mode='markers',
        marker=go.scattermapbox.Marker(
            size=.1,
            color='rgb(242, 177, 172)',
            opacity=0.5
        ),
        hoverinfo='none'
    )]
        
layout = go.Layout(
    title='Ship movement visualization',
    autosize=True,
    hovermode='closest',
    showlegend=False,
    mapbox=go.layout.Mapbox(
        accesstoken=mapbox_access_token,
        bearing=0,
        center=go.layout.mapbox.Center(
            lat=30,
            lon=17
        ),
        pitch=0,
        zoom=3,
        style='light'
    ),
)

fig = go.Figure(data=data, layout=layout)
plotly.offline.plot(fig, filename='test.html')