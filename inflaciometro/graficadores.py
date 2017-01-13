from bokeh.plotting import figure, output_file, show
from bokeh.resources import CDN
from bokeh.embed import components
import math
import numpy as np

def graficar(
    gastoAlimentos,
    gastoTransporte,
    gastoIndumentaria,
    gastoViviendaYServicios,
    gastoHogar,
    gastoSalud,
    gastoEsparcimiento,
    gastoEducacion,
    gastoOtros,
    inflacion_alimento,
    inflacion_transporte,
    meses):

        domain = range(0,meses)
        morf_mensual = [0]*meses
        bond_mensual = [0]*meses

        morf_mensual[-2] = eval(gastoAlimentos)
        bond_mensual[-2] = eval(gastoTransporte)
        
        y = [0]*meses
        for i in range(len(y)):
            #y[i] = morf_mensual[i] + bond_mensual[i]
            y[i] = domain[i]

        title = 'Tu inflacion personalizada es: %s' % (y[-2]*100/y[-3]-100)

        plot = figure(title= title , x_axis_label= 'Meses', y_axis_label= 'Gastos', plot_width =400, plot_height =400)
        plot.line(domain, y, legend= 'f(x)', line_width = 2)
        return components(plot)
        