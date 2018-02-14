


function myFunction() {
    Chart.defaults.global.defaultFontFamily = "'Open Sans', 'sans-serif'";
    Chart.defaults.global.defaultFontSize = 11;
    Chart.defaults.global.defaultFontColor = '#A1A1A1';


    const app = new Vue({
        el: '#app',
        data: {
            albums: [],
            items: [],
            users: [],
            myusers: [],
            searchText: "",
            doughnutLabels: [],
            doughnutValues: [],
            doughnutColors: [],
            doughnutData: [
                {
                    label: 'active listings',
                    value: 0,
                    percent: 0,
                    color: '#A8CDA7',
                },
                {
                    label: 'sold items',
                    value: 0,
                    percent: 0,
                    color: '#199ED9',
                },
                {
                    label: 'unsold items',
                    value: 0,
                    percent: 0,
                    color: '#C0C0C0',
                },
                {
                    label: 'scheduled items',
                    value: 0,
                    percent: 0,
                    color: 'white',
                },
            ],
            doughnutChartOptions: {
                responsive: true,
                maintainAspectRatio: false,
                cutoutPercentage: 75,


                legend: {
                    display: false
                },
            },
            barLabels: [],
            barValues: [],
            barColor: '#A8CDA7',
            barData: [
                {
                    label : '03 09',
                    value : 468,
                    season : 'active listings'
                },            
                {
                    label : '04 09',
                    value : 990,
                    season : 'active listings'
                },            
                {
                    label : '05 09',
                    value : 1029,
                    season : 'active listings'
                },            
                {
                    label : '06 09',
                    value : 502,
                    season : 'active listings'
                },
                {
                    label : '07 09',
                    value : 833,
                    season : 'sold items'
                },
                {
                    label : '08 09',
                    value : 1011,
                    season : 'sold items'
                },
                {
                    label : '09 09',
                    value : 947,
                    season : 'sold items'
                },
                {
                    label : '10 09',
                    value : 750,
                    season : 'unsold items'
                },
                {
                    label : '11 09',
                    value : 654,
                    season : 'unsold items'
                },
                {
                    label : '12 09',
                    value : 521,
                    season : 'unsold items'
                },
                {
                    label : '13 09',
                    value : 1002,
                    season : 'unsold items'
                },
               

            ],
            barChartOptions: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        },
                        gridLines: {
                            display: false
                        },
                    }],
                    xAxes: [{
                        gridLines: {
                            display: false
                        },
                        position: 'bottom',
                        ticks: {
                            autoSkip: false,

                        },
                        barPercentage: .5,
                        categoryPercentage: 1.0,
                    }],
                },
                legend: {
                    display: false
                },

            },

        },
        created() {
            fetch('https://jsonplaceholder.typicode.com/albums')
                .then(response => response.json())
                .then(json => {
                    this.albums = json;
                    for (var i = 0; i < 5; i++) {
                        this.items.push(this.albums[i])
                    }
                });


            fetch('https://jsonplaceholder.typicode.com/users')
                .then(response => response.json())
                .then(json => {
                    this.users = json;
                    for (var i = 0; i < 6; i++) {
                        fetch('https://jsonplaceholder.typicode.com/photos/' + this.users[i].id)
                            .then(response => response.json())
                            .then(json => {
                                this.myusers.push({
                                    name: this.users[json.id - 1].name,
                                    thumbnailUrl: json.thumbnailUrl,
                                    city: this.users[json.id - 1].address.city,
                                })
                            })
                    }

                });



        },

        methods: {
            onSearchChanged: function () {
                var resultList = document.getElementById("resultList");
            
                var clearSearchButton=document.getElementById("searchClear");
                if (this.searchText.length > 2) {
                    clearSearchButton.classList.remove("d-none");
                    resultList.classList.add("resultListShow");
                    resultList.classList.remove("d-none");
             
                } else {
                    resultList.classList.remove("resultListShow");
                    resultList.classList.add("d-none");
                    clearSearchButton.classList.add("d-none");
                }
            },
            clearSearch: function () {
                this.searchText = "";
                this.onSearchChanged()
            },
            changeHeader: function () {
                var originalHeader = document.querySelector(".displayHeader");
                var changeHeader = document.querySelector(".noneDisplayHeader");
                originalHeader.classList.remove("displayHeader");
                originalHeader.classList.add("noneDisplayHeader");
                changeHeader.classList.remove("noneDisplayHeader");
                changeHeader.classList.add("displayHeader")
            },


        },
        computed: {
            sum: function () {
                let sum = 0;
                this.doughnutData.forEach(function (v) {
                    sum += v.value;
                });
                return sum;
            },
            doughnutChartData: function () {
                for (let i = 0; i < this.barData.length; i++) {
                    for (let j = 0; j < this.doughnutData.length; j++) {
                        if (this.barData[i].season == this.doughnutData[j].label) {
                            this.doughnutData[j].value += this.barData[i].value;
                        }
                    }
                }
                
                
                
                for (let i = 0; i < this.doughnutData.length; i++) {
                    let label;
                    let percent = this.doughnutData[i].value / this.sum * 100;
                    label = percent.toFixed(2);
                    this.doughnutData[i].percent = label;
                    this.doughnutLabels.push(this.doughnutData[i].label);
                    this.doughnutValues.push(this.doughnutData[i].value);
                    this.doughnutColors.push(this.doughnutData[i].color);
                }
                return {
                    labels: this.doughnutLabels,
                    datasets: [
                        {
                            backgroundColor: this.doughnutColors,
                            data: this.doughnutValues
                        }
                    ]
                };
            },
            barChartData: function () {
                for (let i = 0; i < this.barData.length; i++) {
                    this.barLabels.push(this.barData[i].label);
                    this.barValues.push(this.barData[i].value);
                }
                return {
                    labels: this.barLabels,
                    datasets: [
                        {
                            data: this.barValues,
                            label: 'listed item on eBay',
                            backgroundColor: this.barColor,
                        }
                    ]
                }
            }
        },
        components: {
            'doughnut-chart': {
                extends: VueChartJs.Doughnut,
                props: ['data', 'options'],
                mounted() {
                    this.renderChart(this.data, this.options)
                }
            },
            'bar-chart': {
                extends: VueChartJs.Bar,
                props: ['data', 'options'],
                mounted() {
                    this.renderChart(this.data, this.options);
                }
            }
        },



    })



}











