import { Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './dashboard.css'
import Sidebar from './Sidebar.js'
import {Line, Doughnut} from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
  } from 'chart.js';
import { useDispatch, useSelector } from 'react-redux'
import { getAdminProduct } from '../../actions/productsActon'
import { getAllOrders } from '../../actions/orderAction'
import { getAllUsers } from '../../actions/userAction'
  
  ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
  );
const Dashboard = () => {
  const dispatch = useDispatch();
  const { products} = useSelector(state=>state.products);
  const {orders} = useSelector(state=>state.allOrders);
  const { users} = useSelector(state=>state.allUsers);
let totalAmount = 0;
orders && orders.forEach((item)=>(
  totalAmount += item.totalPrice
))

  let outOfStock = 0;

  products && products.forEach((item)=>{
    if (item.stock === 0) {
      outOfStock += 1;
    }
  });
  const lineState ={
    labels: [ 'Initial Amount', 'Amount Earned'],
    datasets:[
      {
        label: 'TOTAL AMOUNT',
        backgroundColor: ['aqua'],
        hoverBackgroundColor: ['rgb(96, 191, 255)'],
        data:[0, totalAmount],
      },
    ]
  }

  const doughnutState = {
    labels: ['Out of Stock', 'InStock'],
    datasets:[
      {
        backgroundColor: ['#00A684', '#680084'],
        hoverBackgroundColor:['#485000', '#35014F'],
        data: [outOfStock, products.length - outOfStock ]
      }
    ]
  }
  useEffect(() => {

    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch])
  
  return (
    <>
    <div className="dashboard">
      <Sidebar/>
      <div className="dashboardContainer">
        <Typography component={'h1'}>Dashboard</Typography>
        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br/> ${totalAmount}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to={'/admin/products'}>
              <p>Product</p>
              <p>{products && products.length}</p>
            </Link>
            <Link to={'/admin/orders'}>
              <p>Orders</p>
              <p>{orders && orders.length}</p>
              </Link>
              <Link to={'/admin/users'}>
                <p>Users</p>
                <p>{users && users.length}</p>
                </Link>
            </div>
          </div>
          <div className="lineChart">
            <Line data={lineState}/>
            </div>

            <div className="doughtnutChart">
              <Doughnut data={doughnutState}/>
              </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard

/* 
                     _
                    ###
                    ### 
                    ### 
                    ### 
            |~~~### ### ### ###
             |||###############
               ||#############
                  ###########
                   #########
                   
                   
                   */