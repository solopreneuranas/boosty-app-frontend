import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import { getData } from '../../../Services/FetchNodeServices';
import { useEffect, useState } from 'react';


const AdminChart = () => {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Sales/Profit Graph',
            },
        },
    };

    const labels = [
        "January", "February", "March", "April",
        "May", "June", "July", "August",
        "September", "October", "November", "December"
    ];

    const [graphData, setGraphData] = useState([])
    const fetchGraphData = async () => {
        let response = await getData('graph/display_graph_data_company')
        if (response?.status) {
            setGraphData(response?.data)
        }
    }

    useEffect(() => {
        fetchGraphData()
    }, [])

    const monthlySales = Array(12).fill(0);
    const monthlyProfit = Array(12).fill(0);

    if (graphData) {
        graphData.forEach(order => {
            const orderDate = new Date(order.orderdate);
            const month = orderDate.getMonth();
            const orderAmount = parseFloat(order.orderamount);
            monthlySales[month] += orderAmount;
        });
    }

    if (graphData) {
        graphData.forEach(order => {
            const orderDate = new Date(order.orderdate);
            const month = orderDate.getMonth();
            const profit = parseFloat(order.companyAmount) - parseFloat(order.selectedStateFee);
            monthlyProfit[month] += profit;
        });
    }

    const monthNames = [
        "January", "February", "March", "April",
        "May", "June", "July", "August",
        "September", "October", "November", "December"
    ];

    const finalData = {
        labels: monthNames,
        sales: monthlySales
    };

    console.log('monthlySales', monthlySales);

    const data = {
        labels,
        datasets: [
            {
                label: 'Sales',
                data: monthlySales,
                borderColor: 'black',
                backgroundColor: 'black',
            },
            {
                label: 'Profit',
                data: monthlyProfit,
                borderColor: '#0069ff',
                backgroundColor: '#0069ff',
            },
        ],
    };

    return <Line options={options} data={data} />;
}


export default AdminChart