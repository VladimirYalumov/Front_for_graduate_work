import React, {useEffect} from 'react';
import './Header.js';
import Header from "./Header";
import Content from "./MainItems/Content";
import Context from "./context";
import AnyChart from 'anychart-react'
import anychart from 'anychart'


function App() {

    let [page, setPage] = React.useState([1])
    let [redisKeys, setRedisKeys] = React.useState([]);
    let [errorTrips, setErrorTrips] = React.useState([]);
    let [pageTable, setPageTable] = React.useState([1]);
    let [loading, setLoading] = React.useState(false);
    let [trips, setTrips] = React.useState([]);

    let [ch1, setCh1] = React.useState();

    useEffect(() => {
        fetch('http://test-ajax/get-keys.php', {method: "GET"})
            .then(response => response.json())
            .then(data => {
                setTimeout(() => {
                    setRedisKeys(data)
                    setLoading(true)
                }, 4000)
            })
            .catch(e => {
                return e;
            });
    },[]);

    function checkSupplier(array, elem) {
        let flag = null;
        if(array) {
            for(let i = 0; i < array.length; i++){
                if (array[i].x === elem) {
                    flag = i;
                }
            }
        }

        return flag;
    }

    function getErrorsByKey(id)
    {
        let errorTripId  = {
            id: id
        }

        setPageTable(1);
        fetch('http://test-ajax/get_error_trips_by_key.php', {
            method: "POST",
            headers : {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json'
            },
            body: JSON.stringify(errorTripId)
        })
            .then(response => response.json())
            .then(data => {
                setErrorTrips(data);

                let arr = [2,4,3,1];

                let trent_arr = [];

                for(let i = 0; i < arr.length; i++){
                    trent_arr[i] = (arr[i-1]+arr[i]+arr[i+1])/3;
                }

                let array = [75,90,104,9,22];
                let trend_array = [];
                let i;

                for(i = 0; i < array.length; i++){
                    trend_array[i] = (array[i-1]+array[i]+array[i+1])/3;
                    console.log('Index: ' + i);
                }

                // create data set on our data
                let dataSet = anychart.data.set([
                    ['26-07-2020', trend_array[0], array[0]],
                    ['27-07-2020', trend_array[1], array[1]],
                    ['28-07-2020', trend_array[2], array[2]],
                    ['29-07-2020', trend_array[3], array[3]],
                    ['30-07-2020', trend_array[4], array[4]]
                ]);

                // map data for the second series, take x from the zero column and value from the second column of data set
                let seriesData_1 = dataSet.mapAs({'x': 0, 'value': 1});

                // map data for the third series, take x from the zero column and value from the third column of data set
                let seriesData_2 = dataSet.mapAs({'x': 0, 'value': 2});

                // create column chart
                let chart = anychart.column();

                // turn on chart animation
                chart.animation(true);

                // set chart title text settings
                chart.title('Grouped by date');

                // create second series with mapped data
                let columnSeries = chart.column(seriesData_2);
                columnSeries.name('Column');

                // create third series with mapped data
                let splineSeries = chart.splineArea(seriesData_1);
                splineSeries.name('Spline');

                chart.tooltip().displayMode('union');

                chart.interactivity().hoverMode('by-x');

                // set container id for the chart
                chart.container('chart-column');

                setCh1(chart);
            });

        fetch('http://test-ajax/get-trips.php', {
            method: "POST",
            headers : {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json'
            },
            body: JSON.stringify(errorTripId)
        })
            .then(response => response.json())
            .then(data => {
                let newTripsArray = [];

                for(let j = 0; j < data.length; j++){
                    let supplier = data[j].supplier;

                    let flag = false;

                    if(newTripsArray.length !== 0) {
                        let k = newTripsArray.length;
                        for(let i = 0; i < newTripsArray.length; i++){
                            if (newTripsArray[i].x === supplier) {
                                console.log(newTripsArray[i].x);
                                newTripsArray[i].value ++;
                                flag = true;
                                break;
                            }
                        }
                        if(!flag) newTripsArray.push({x:supplier, value:1});
                    }
                    else {
                        newTripsArray[0] = {x:supplier, value:1};
                    }

                }
                console.log(newTripsArray);
                setTrips(newTripsArray);
            });
    }
    function pageChange(k) {
        if(k===1 && page < redisKeys.length/5) {
            page++
        }
        else if(k===0 && page > 1) {
            page--
        }
        setPage(page)
    }

    function pageTableChange(k) {
        if(k===1 && pageTable < errorTrips.length/5) {
            pageTable++
        }
        else if(k===0 && pageTable > 1) {
            pageTable--
        }
        setPageTable(pageTable)
    }

    return (
        <Context.Provider value={{ getErrorsByKey, pageTable, errorTrips }}>
            <div className={"container mt-5"}>
                <div className={"card"}>
                    <Header />
                    <div className={"card-body row"}>
                        <Content
                            redisKeys = { redisKeys }
                            page={ page }
                            pageChange = { pageChange }
                            errorTrips = { errorTrips }
                            pageTableChange = {pageTableChange}
                            loading = {loading}
                            setLoading = {setLoading}
                        />
                        <div className={"container row"}>
                        <div className={"col-4"}>
                            {trips.length !== 0 ? <AnyChart
                                    type='pie'
                                    id="chart-container-1"
                                    weight={'100%'}
                                    height={300}
                                    data={trips}
                                    title='Grouped by suppliers'
                                    theme='Light Blue'
                                />
                                :
                                <div></div>
                            }
                        </div>
                        <div className={"col-7"}>
                            {trips.length !== 0 ? <AnyChart
                                    width={'100%'}
                                    height={300}
                                    instance={ch1}
                                />
                                :
                                <div></div>
                            }
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </Context.Provider>
    );
}

export default App;
