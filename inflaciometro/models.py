from __future__ import unicode_literals

from django.db import models

# Create your models here.
class dataUsuario(models.Model):
	gastoAlimentos = models.FloatField(default=0, null=True)
	gastoIndumentaria = models.FloatField(default=0, null=True)
	gastoViviendaYServicios = models.FloatField(default=0, null=True)
	gastoHogar = models.FloatField(default=0, null=True)
	gastoSalud = models.FloatField(default=0, null=True)
	gastoTransporte = models.FloatField(default=0, null=True)
	gastoEsparcimiento = models.FloatField(default=0, null=True)
	gastoEducacion = models.FloatField(default=0, null=True)
	gastoOtros = models.FloatField(default=0, null=True)

	@classmethod
	def create(cls, gastoAlimentos, gastoTransporte,
			gastoIndumentaria, gastoViviendaYServicios, gastoHogar, gastoSalud,
			gastoEsparcimiento, gastoEducacion, gastoOtros
		):
		info = cls(
			gastoAlimentos = gastoAlimentos,
			gastoTransporte = gastoTransporte,
			gastoIndumentaria = gastoIndumentaria,
			gastoViviendaYServicios = gastoViviendaYServicios,
			gastoHogar = gastoHogar,
			gastoSalud = gastoSalud,
			gastoEsparcimiento = gastoEsparcimiento,
			gastoEducacion = gastoEducacion,
			gastoOtros = gastoOtros
		)
		return info

	def __str__(self):
		return ('( ' 
	+ str(self.gastoAlimentos) + ', '
	+ str(self.gastoIndumentaria) + ', ' 
	+ str(self.gastoViviendaYServicios) + ', '
	+ str(self.gastoHogar) + ', '
	+ str(self.gastoSalud) + ', '
	+ str(self.gastoTransporte) + ', '
	+ str(self.gastoEsparcimiento) + ', '
	+ str(self.gastoEducacion) + ', '
	+ str(self.gastoOtros) + ' )')

