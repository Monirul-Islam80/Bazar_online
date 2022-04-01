import Dashboard from '@mui/icons-material/Dashboard'
import React from 'react'
import './sidebar.css'
import { Link } from 'react-router-dom'
import { TreeItem, TreeView } from '@material-ui/lab'
import logo from '../../images/logo.png'
import { MdAdd, MdExpandMore, MdImportExport, MdListAlt, MdPeople, MdPostAdd, MdRateReview } from 'react-icons/md'
const Sidebar = () => {
    return (
        <>
            <div className="sidebar">
                <Link to="/">
                    <img src={logo} alt="logo" />
                </Link>
                <Link to='/admin/dashboard'>
                    <p>
                        <Dashboard />Dashboard
                    </p>
                </Link>
                <span>
                    <TreeView
                        defaultCollapseIcon={<MdExpandMore />}
                        defaultExpandIcon={<MdImportExport />}
                    >
                        <TreeItem nodeId='1' label='Products' >
                            <Link to='/admin/products'>
                                <TreeItem nodeId='2' label='All' icon={<MdPostAdd />} />
                            </Link>
                            <Link to={'/admin/product'}>
                                <TreeItem nodeId='3' label="Create" icon={<MdAdd />} />
                            </Link>
                        </TreeItem>

                    </TreeView>
                </span>
                <Link to={'/admin/orders'}>
                    <p>
                        <MdListAlt/>
                        Orders
                    </p>
                    </Link>
                    <Link to={'/admin/users'}>
                        <p>
                            <MdPeople/>
                            Users
                        </p>
                        </Link>
                        <Link to={'/admin/reviews'}>
                            <p>
                                <MdRateReview/>
                                Reviews
                            </p>
                            </Link>
            </div>
        </>
    )
}

export default Sidebar