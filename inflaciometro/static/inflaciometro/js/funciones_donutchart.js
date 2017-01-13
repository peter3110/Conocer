
// ========================== Funciones para el Donut-Chart ========================= //

function DonutChart(tag_donut, nDonut) {

  var $charts_donut = $(tag_donut);
  var charts_donut = d3.select(tag_donut + nDonut);
  var charts_donut_other = d3.select(tag_donut + (1 - nDonut));

  var createCenter = function(pie) {

    var eventObj = {
        'mouseover': function(d, i) {
            d3.select(this)
              .transition()
              .attr("r", chart_r * 0.65);
        },

        'mouseout': function(d, i) {
            d3.select(this)
              .transition()
              .duration(500)
              .ease('bounce')
              .attr("r", chart_r * 0.6);
        },

        'click': function(d, i) {
            var paths = charts_donut.selectAll('.clicked');
            pathAnim(paths, 0);
            paths.classed('clicked', false);
            resetAllCenterText();
        },
    };

    var thisDonut = charts_donut.selectAll('.donut');

    // The circle displaying total data.
    thisDonut.append("svg:circle")
      .attr("r", chart_r * 0.6)
      .style("fill", "#E7E7E7")
      .on(eventObj);

    thisDonut.append('text')
      .attr('class', 'center-txt type')
      .attr('y', chart_r * -0.16)
      .attr('text-anchor', 'middle')
      .style('font-weight', 'bold')
      .text(function(d, i) {
          return d.type;
      });
    thisDonut.append('text')
      .attr('class', 'center-txt value')
      .attr('text-anchor', 'middle');
    thisDonut.append('text')
      .attr('class', 'center-txt percentage')
      .attr('y', chart_r * 0.16)
      .attr('text-anchor', 'middle')
      .style('fill', '#A2A2A2');
  };

  var setCenterText = function(thisDonut) {
      var sum = d3.sum(thisDonut.selectAll('.clicked').data(), function(d) {
          return d.data.val;
      });

      thisDonut.select('.value')
          .text(function(d) {
              return (sum)? '$' + sum.toFixed(1) 
                          : '$' + d.total.toFixed(1);
          });
      thisDonut.select('.percentage')
          .text(function(d) {
              return (sum)? (sum/d.total*100).toFixed(2) + '%'
                          : '';
          });
  };

  var resetAllCenterText = function() {
      charts_donut.selectAll('.value')
          .text(function(d) {
              return '$' + d.total.toFixed(1);
          });
      charts_donut.selectAll('.percentage')
          .text('');
  };

  var pathAnim = function(path, dir) {
      switch(dir) {
          case 0:
              path.transition()
                  .duration(500)
                  .ease('bounce')
                  .attr('d', d3.svg.arc()
                      .innerRadius(chart_r * 0.7)
                      .outerRadius(chart_r)
                  );
              break;

          case 1:
              path.transition()
                  .attr('d', d3.svg.arc()
                      .innerRadius(chart_r * 0.7)
                      .outerRadius(chart_r * 1.08)
                  );
              break;
      };
  };

  var updateDonut = function() {

    var eventObj = {
      'mouseover': function(d, i, j) {
          pathAnim(d3.select(this), 1);
          //pathAnim(d3.select(),1);

          var thisDonut = charts_donut.select('.type' + j);
          thisDonut.select('.value').text(function(donut_d) {
              return '$' + d.data.val.toFixed(1);
          });
          thisDonut.select('.percentage').text(function(donut_d) {
              return (d.data.val/donut_d.total*100).toFixed(2) + '%';
          });

          d3.select('#tag'+i)
            .transition()
            .attr("r", 8);
      },
      
      'mouseout': function(d, i, j) {
          var thisPath = d3.select(this);
          if (!thisPath.classed('clicked')) {
              pathAnim(thisPath, 0);
          }
          var thisDonut = charts_donut.select('.type' + j);
          setCenterText(thisDonut);

          d3.select('#tag'+i) 
              .transition()
              .attr("r", 5);

          var thisDonut = charts_donut.select('.type' + j);
          setCenterText(thisDonut);
      },

      'click': function(d, i, j) {
          var thisDonut = charts_donut.select('.type' + j);

          if (0 === thisDonut.selectAll('.clicked')[0].length) {
              thisDonut.select('circle').on('click')();
          }

          var thisPath = d3.select(this);
          var clicked = thisPath.classed('clicked');
          pathAnim(thisPath, ~~(!clicked));
          thisPath.classed('clicked', !clicked);

          setCenterText(thisDonut);
      }
    };

    var pie = d3.layout.pie()
      .sort(null)
      .value(function(d) {
        return d.val;
    });

    var arc = d3.svg.arc()
    .innerRadius(chart_r * 0.7)
      .outerRadius(function() {
        return (d3.select(this).classed('clicked'))? chart_r * 1.08
          : chart_r;
    });

    // Start joining data with paths
    var paths = charts_donut.selectAll('.donut')
      .selectAll('path')
      .data(function(d, i) {
        return pie(d.data);
    });

    paths
      .transition()
      .duration(1000)
      .attr('d', arc);

    paths.enter()
      .append('svg:path')
        .attr('d', arc)
          .style('fill', function(d, i) {
            return color(i);
        })
        .style('stroke', '#FFFFFF')
        .on(eventObj);

    paths.exit().remove();

    resetAllCenterText();
  };

  this.create = function(dataset) {

    chart_r = 100;
    var donut_svg_width = 400;
    var donut_svg_height = 400; 
    var donut_width = 200;
    var donut_height = 200;

    var donut = charts_donut
      .selectAll('.donut')
        .data(dataset)
          .enter().append('svg:svg')
            .attr('width', String(donut_svg_width)+'px')
            .attr('height', String(donut_svg_height)+'px')
          .append('svg:g')
            .attr('class', function(d, i) {
                return 'donut type' + i;
            })
            .attr('width', String(donut_width)+'px')
            .attr('height', String(donut_height)+'px')
            .attr('transform', 'translate(' + donut_svg_width / 2 + ',' + donut_svg_height / 2+ ')');

    createCenter();

    updateDonut();
  };

  this.update = function(dataset) {
    // Assume no new categ of data enter
    var donut = charts_donut
      .selectAll(".donut")
        .data(dataset);
    
    updateDonut();
  };
};

function createDonutCharts() {
  donut1 = new DonutChart('#donutchart-donut', 0);
  donut1.create(dataset);

  donut2 = new DonutChart('#donutchart-donut', 1);
  donut2.create(dataset);
}

