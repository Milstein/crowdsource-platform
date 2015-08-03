var eventApp={};


$(document).ready(function() {
    
    if ($('#calendar').length > 0) {
    
        function getParameterByName(name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        }
        
        function eventDateSorter(a, b) {
            if (a.start == b.start) {
                return 0;
            } else {
                return a.start < b.start ? -1 : 1;
            }
        }
        
        function eventCountrySorter(a, b) {
            if (a.country == b.country) {
                return 0;
            } else {
                return a.country < b.country ? -1 : 1;
            }
        }
        
        function eventTitleSorter(a, b) {
            if (a.title == b.title) {
                return 0;
            } else {
                return a.title < b.title ? -1 : 1;
            }
        }
        
        var cat_id = getParameterByName('cat_event');
        
        var date =  new Date();
        var y = date.getFullYear();
        
        var m = date.getMonth()+1;
        if (m < 10) {
            m = '0'+m;
        }
        
        var d = date.getDate();
        if (d < 10) {
            d = '0'+d;
        }
        
        var defaultDate = y + '-' + m + '-' + d;
        
        $.ajax({
            type: "POST",
            url: "/wp-content/themes/scitechconnect/eventGetter.php",
            data: { event_cat: cat_id }
        })
        .done(function(data) {
            data = $.parseJSON(data);
            var name = data.name;
            
            for (var k in data.event) {
                data.event[k].title = data.event[k].title.replace("&amp;", "&");
            }
            
            $('.eventTitle span').text(name);
            
            $('.calendarContainer .loader').fadeOut(250, function() {
                $('.calendarContainer .hidden').fadeIn(250, function() {
                    $('#calendar .call-month').fullCalendar({
                        header: {
                            left: 'prev,next today',
                            center: 'title',
                            right: 'month,basicWeek,basicDay'
                        },
                        defaultDate: defaultDate,
                        editable: true,
                        eventLimit: true, // allow "more" link when too many events
                        events: data.event,
                        eventTextColor: '#fff',
                        eventClick: function(event) {
                            if (event.url) {
                                window.open(event.url);
                                return false;
                            }
                        }
                    });
                });
            });
                
            var a = 0,
                b = 0,
                c = 0;

            // HELPER FOR MONTHS

            var month1 = new Array();
            month1['01'] = "January";
            month1['02'] = "February";
            month1['03'] = "March";
            month1['04'] = "April";
            month1['05'] = "May";
            month1['06'] = "June";
            month1['07'] = "July";
            month1['08'] = "August";
            month1['09'] = "September";
            month1['10'] = "October";
            month1['11'] = "November";
            month1['12'] = "December";
            
            eventApp.yearsArr = {};
            var monthsArr = [];
            for (var x in data.event) {
                /*
                var date = new Date(data.event[x].start),
                    year = date.getFullYear().toString(),
                    month = (date.getMonth()).toString();
                */
                
                var date = data.event[x].start.match(/\d+/g),
                    year = date[0],
                    month = date[1];

                if(typeof eventApp.yearsArr[year] === 'undefined'){
                    eventApp.yearsArr[year]=[];
                }
                if(typeof eventApp.yearsArr[year][month] === 'undefined'){
                    eventApp.yearsArr[year][month]=[];
                }
                //console.log(year+'//'+month)
                eventApp.yearsArr[year][month].push(data.event[x]);   
            }

            ///// EVENTS BY YEAR
            //eventApp.yearsArr = eventApp.yearsArr.sort();
            //monthsArr = monthsArr.sort();
            //var orderedDate = data.event.sort(eventDateSorter);
                var yearArray = eventApp.yearsArr;
              //eventApp.yearsArr = yearArray.sort();
            for (var x in eventApp.yearsArr) {
                
                $('.call-year').append($('<div class="year-cont-'+x+'"></div>'));
                $('.year-cont-'+x).append($('<div class="year-year"><div class="yearText">'+x+'</div></div>'));
                
                for (var xm in eventApp.yearsArr[x]) {
                     
                    $('.year-cont-'+x+' .year-year').append($('<div class="year-months-'+xm+'"></div>'));
                    //$('.year-cont-'+x+' .year-year .year-months-'+xm).append($('<div>', {class: 'year-months', text: xm}));
                    $('.year-cont-'+x+' .year-year .year-months-'+xm).append($('<div class="year-months-container group"><div class="monthText">'+month1[xm]+'</div></div>'));
                    
                    for (var xi in eventApp.yearsArr[x][xm]) {

                        /*
                        var date = new Date(eventApp.yearsArr[x][xm][xi].start),
                            year = date.getFullYear(),
                            month = date.getMonth();
                            day = date.getDay()+1;
                        */
                        
                        var date = eventApp.yearsArr[x][xm][xi].start.match(/\d+/g),
                            year = date[0],
                            month = date[1],
                            day = date[2];

                            $('.year-cont-'+x+' .year-year .year-months-'+xm+' .year-months-container').append($('<div class="event"><div class="title"><a target="_blank" href="'+eventApp.yearsArr[x][xm][xi].url+'">'+eventApp.yearsArr[x][xm][xi].title+'</a></div><div class="date">'+month+', '+day+', '+year+'</div><div class="location">'+eventApp.yearsArr[x][xm][xi].city+', '+eventApp.yearsArr[x][xm][xi].country+'</div></div>'));  
                            if(typeof eventApp.yearsArr[x][xm][xi].image !== 'undefined'){
                               $('.year-cont-'+x+' .year-year .year-months-'+xm+' .year-months-container even').append($('<div class="image"><img src="/path/to/city/image/'+eventApp.yearsArr[x][xm][xi].image+'.jpg" /></div>'));  
                            }               

                    }
                    
                    
                }
                
                
            }
            
           
            /// ENVENTS BY LOCATION
            var orderedLocation = data.event.sort(eventCountrySorter);
            var oddEven = '';
            var currCountry ="";
            var HTMLtoPlace="";
            for (var y in orderedLocation) {
                if (y % 2 == 0) {
                    oddEven = 'even'
                } else {
                    oddEven = 'odd'
                }
                 if(currCountry!=orderedLocation[y].country){
                    currCountry=orderedLocation[y].country;
                    //$('.call-location').append($('<div>', {class: 'country yearText', html:orderedLocation[y].country}));
                }
               
               
                


                $('.call-location').append($('<div class="'+oddEven+' event-list loc-cont loc-cont-'+b+'"></div>'));
                $('.call-location .loc-cont-'+b).append($('<a class="loc-title" target="_blank" href="'+orderedLocation[y].url+'">'+orderedLocation[y].title+'</a>'));
                $('.call-location .loc-cont-'+b).append($('<p class="loc-location">'+orderedLocation[y].city+', '+orderedLocation[y].country+'</p>'));
                $('.call-location .loc-cont-'+b+' .loc-location').append($('<span class="loc-date">'+orderedLocation[y].start+'</span>'));
                
                b++;
                 if (b % 10 == 0 && b>0) {
                    HTMLtoPlace+='<div class="slide">'+$('.call-location').html()+'</div>';
                    $('.call-location div').remove();
                }else if(b==(orderedLocation.length)){
                    HTMLtoPlace+='<div class="slide">'+$('.call-location').html()+'</div>';
                    $('.call-location div').remove();
                }
            }

           $('.call-location').html('<div class="cycle">'+HTMLtoPlace+'</div>');

            /// EVENTS BY DATE
            var currCountry ="";
             var HTMLtoPlace="";
            var orderedTitle = data.event.sort(eventTitleSorter);
            for (var z in orderedTitle) {
                if (z % 2 == 0) {
                    oddEven = 'even'
                } else {
                    oddEven = 'odd'
                }

                /*if(currCountry!=orderedTitle[z].start){
                    currCountry=orderedTitle[z].start;
                    $('.call-az').append($('<div>', {class: 'country', html:'<h3>'+orderedTitle[z].start+'</h3>'}));
                }*/
                
                $('.call-az').append($('<div class="'+oddEven+' event-list az-cont az-cont-'+c+'"></div>'));
                $('.call-az .az-cont-'+c).append($('<a class="az-title" target="_blank" href="'+orderedTitle[z].url+'">'+orderedTitle[z].title+'</a>'));
                $('.call-az .az-cont-'+c).append($('<p class="az-location">'+orderedTitle[z].city+', '+orderedTitle[z].country+'</p>'));
                $('.call-az .az-cont-'+c+' .az-location').append($('<span class="az-date">'+orderedTitle[z].start+'</span>'));
                
                c++;
                if (c % 10 == 0 && c>0) {
                    HTMLtoPlace+='<div class="slide">'+$('.call-az').html()+'</div>';
                    $('.call-az div').remove();
                }else if(c==(orderedLocation.length)){
                    HTMLtoPlace+='<div class="slide">'+$('.call-az').html()+'</div>';
                    $('.call-az div').remove();
                }
            }
            $('.call-az').html('<div class="cycle">'+HTMLtoPlace+'</div>');
            
            
            
            
            
            $('.event-year').click(function() {
                $('.eventlist-control .active').removeClass('active');
                $('.eventlist-control .event-year').addClass('active');
                
                $('#calendar .active').fadeOut(250, function() {
                    $(this).removeClass('active');
                    $('.call-year').fadeIn(250, function() {
                        $(this).addClass('active');
                        $('.year-months-container .event a').click(function(e) {
                            e.preventDefault();
                        });
                        
                        $('.year-months-container .event').click(function() {
                            var href = $(this).children('.title').children('a').attr('href');
                            //console.log(href);
                            window.open(href, '_blank');
                        });
                    });
                });
                return false;
            });
            
            $('.event-month').click(function() {
                $('.eventlist-control .active').removeClass('active');
                $('.eventlist-control .event-month').addClass('active');
                
                $('#calendar .active').fadeOut(250, function() {
                    $(this).removeClass('active');
                    $('.call-month').fadeIn(250, function() {
                        $(this).addClass('active');
                    });
                });
                return false;
            });
            
            $('.event-location').click(function() {
                $('.slide').css({'opacity':0});
                $('.eventlist-control .active').removeClass('active');
                $('.eventlist-control .event-location').addClass('active');
                $('.location-control, .az-control').remove();
                $('#calendar .active').fadeOut(250, function() {
                    $(this).removeClass('active');
                    $('.call-location').fadeIn(250, function() {
                        $(this).addClass('active');
                        $('.call-az .cycle').cycle('destroy');
                        $('.call-location').append($('<div class="location-control group"></div>'));
                        $('.call-location .location-control').append($('<div class="location-prev">previous</div>'));
                        $('.call-location .location-control').append($('<ul class="location-pages group"></ul>'));
                        $('.call-location .location-control').append($('<div class="location-next">next</div>'));
                        $('.call-location .cycle').cycle({
                            slides: '.slide',
                            pager: '.location-pages',
                            pagerTemplate: '<li><a href=#>{{slideNum}}</a></li>',
                            prev: '.location-prev',
                            next: '.location-next',
                            timeout:0,
                            speed: 500
                        });
                        $('.slide').animate({'opacity':100});
                        
                        $('.event-list.loc-cont a').click(function(e) {
                            e.preventDefault();
                        });

                       $('.event-list.loc-cont').click(function() {
                            var href = $(this).children('a').attr('href');
                            //console.log(href);
                            window.open(href, '_blank');
                        });

                    });
                });


            

                return false;
            });
            
            $('.event-az').click(function() {
                $('.slide').css({'opacity':0});
                $('.eventlist-control .active').removeClass('active');
                $('.eventlist-control .event-az').addClass('active');
                $('.location-control, .az-control').remove();
                $('#calendar .active').fadeOut(250, function() {
                    $(this).removeClass('active');
                    $('.call-az').fadeIn(250, function() {
                        $(this).addClass('active');
                        $('.call-location .cycle').cycle('destroy');
                        $('.call-az').append($('<div class="az-control group"></div>'));
                        $('.call-az .az-control').append($('<div class="az-prev">previous</div>'));
                        $('.call-az .az-control').append($('<ul class="az-pages group"></ul>'));
                        $('.call-az .az-control').append($('<div class="az-next">next</div>'));
                        $('.call-az .cycle').cycle({
                            slides: '.slide',
                            pager: '.az-pages',
                            pagerTemplate: '<li><a href=#>{{slideNum}}</a></li>',
                            prev: '.az-prev',
                            next: '.az-next',
                            timeout:0,
                            speed: 500
                        });
                        $('.slide').animate({'opacity':100});
                       
                        $('.event-list.az-cont a').click(function(e) {
                            e.preventDefault();
                        });
                        
                        $('.event-list.az-cont').click(function() {
                            var href = $(this).children('a').attr('href');
                            //console.log(href);
                            window.open(href, '_blank');
                        });
                        
                    });
                });
                return false;
            });
            
        });
    }
});
