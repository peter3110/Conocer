from django.conf.urls import url

from . import views

urlpatterns = [
	url(r'^$', views.index, name='index'),
	url(r'^index1/', views.index1, name='index1'),

	url(r'^pagina1/', views.pagina1, name='pagina1'),
	url(r'^pagina2/', views.pagina2, name='pagina2'),
	url(r'^pagina3/', views.pagina3, name='pagina3'),
	url(r'^pagina4/', views.pagina4, name='pagina4'),

	url(r'^get_data/', views.get_data, name='get_data'),

	url(r'^add_user_information/', views.add_user_information, name='add_user_information'),
]