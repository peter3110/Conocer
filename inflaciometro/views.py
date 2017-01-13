from django.shortcuts import render, render_to_response

from django.views.decorators.csrf import requires_csrf_token, csrf_exempt, csrf_protect
from django.contrib.auth.decorators import login_required

from django.http import JsonResponse, HttpResponse

from .models import *
import json


###############
@login_required
def home(request):
    return render(request, 'inflaciometro/home.html')

############
@csrf_exempt
def index(request):
    # Metodo GET
    return render_to_response('inflaciometro/index.html')

############
@csrf_exempt
def index1(request):
    if request.method == 'GET':
        return HttpResponse('inflaciometro/index.html')

    elif request.method == 'POST':
        # Obtengo la IP del cliente
        ip_client = request.META['REMOTE_ADDR']
        gastoTotal = request.POST.get('gastoTotal')

        return render_to_response('inflaciometro/index2.html', {'gastoTotal': gastoTotal})

###############
@csrf_exempt
def pagina1(request):
    return render_to_response('inflaciometro/pagina1.html', {'gastoTotal': 10000})

###############
@csrf_exempt
def pagina2(request):
    return render(request, 'inflaciometro/pagina2.html', {'gastoTotal': 10000})

###############
@csrf_exempt
def pagina3(request):
    return render(request, 'inflaciometro/pagina3.html', {'gastoTotal': 10000})

###############
def pagina4(request):
    return render(request, 'inflaciometro/pagina4.html')

############
@csrf_exempt
def add_user_information(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    gastoTotal = float(body['gastoTotal'])
    
    # Guardo la data de los sliders modificados
    gastoTransporte  = float(body['gastoTransporte'])
    gastoAlimentos  = float(body['gastoAlimentos'])
    gastoIndumentaria = float(body['gastoIndumentaria'])
    gastoViviendaYServicios = float(body['gastoViviendaYServicios'])
    gastoHogar = float(body['gastoHogar'])
    gastoSalud = float(body['gastoSalud'])
    gastoEsparcimiento = float(body['gastoEsparcimiento'])
    gastoEducacion = float(body['gastoEducacion'])
    gastoOtros = float(body['gastoOtros'])

    # Guardo en la bdd
    info1 = dataUsuario.create(
        gastoAlimentos = gastoAlimentos,
        gastoTransporte = gastoTransporte,
        gastoIndumentaria = gastoIndumentaria,
        gastoViviendaYServicios = gastoViviendaYServicios,
        gastoHogar = gastoHogar,
        gastoSalud = gastoSalud,
        gastoEsparcimiento = gastoEsparcimiento,
        gastoEducacion = gastoEducacion,
        gastoOtros =    gastoOtros
    )
    info1.save()

    return HttpResponse('inflaciometro/index.html', content_type='text/html')


############
@csrf_exempt
def get_data(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    gastoTotal = float(body['gastoTotal'])

    with open('inflaciometro/static/inflaciometro/data/ponderadores.json') as data_file:
        ponderadores = json.loads(data_file.read())

    some_data = {
        'gastoTotal': gastoTotal,

        'gastoTransporte': gastoTotal * ponderadores["transporte"],
        'gastoAlimentos': gastoTotal * ponderadores["alimentos"],
        'gastoIndumentaria': gastoTotal * ponderadores["indumentaria"],
        'gastoViviendaYServicios': gastoTotal * ponderadores["viviendayservicios"],
        'gastoHogar': gastoTotal * ponderadores["hogar"],
        'gastoSalud': gastoTotal * ponderadores["salud"],
        'gastoEsparcimiento': gastoTotal * ponderadores["esparcimiento"],
        'gastoEducacion': gastoTotal * ponderadores["educacion"],
        'gastoOtros': gastoTotal * ponderadores["otros"],

        'transporte': ponderadores["transporte"],
        'alimentos': ponderadores["alimentos"],
        'indumentaria': ponderadores["indumentaria"],
        'viviendayservicios': ponderadores["viviendayservicios"],
        'hogar': ponderadores["hogar"],
        'salud': ponderadores["salud"],
        'esparcimiento': ponderadores["esparcimiento"],
        'educacion': ponderadores["educacion"],
        'otros': ponderadores["otros"]
    }
    data = json.dumps(some_data)
    return HttpResponse(data, content_type='application/json')