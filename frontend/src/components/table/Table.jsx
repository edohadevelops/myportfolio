import React from 'react'
import './style.css'
import { HiOutlineFilter } from "react-icons/hi";
import { FaSearch } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { CgTrashEmpty } from "react-icons/cg";
import { FaChevronUp } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa6";

const Table = ({
    columns,
    tableData,
}) => {

    const titleCol = 50 - (columns?.length - 3) * 15;
  return (
    <div className='table-component'>
      <div className="table-filters">
        <div className="table-filters-input">
            <input type="text" placeholder='Search' />
            <span className="table-input-search-icon">
                <FaSearch size={"13px"} />
            </span>
        </div>
        <div className="table-filter">
            <span className="table-filter-icon">
                <HiOutlineFilter size={"15px"} fontWeight={900} />
            </span>
            <span className="table-filter-text">Filters</span>

        </div>

      </div>
      <table className="table-component-table px-4">
        <thead className='table-header px-4'>
            <tr>
                <th className='py-2'></th>
                {
                    columns?.map((col,col_index)=>(
                        <th key={col_index}>
                            <div className='flex gap-1 items-center'>
                                <span>{col}</span>
                                <div className='flex flex-col'>
                                    <button><FaChevronUp size={"7px"}/></button>
                                    <button className='-mt-[2px]'><FaChevronDown size={"7px"}/></button>
                                </div>
                            </div>
                        </th>
                    ))
                }  
                <th className='py-2'>Status</th>
                <th className='py-2'>Actions</th>
            </tr>
        </thead>
        <tbody className='table-body'>
            {
                tableData?.map((row,row_index)=>(
                    <tr key={row_index}>
                        <td className='w-[5%] '>
                            <div className="flex w-full items-center justify-center">
                                <div className="table-item-icon">
                                    <div className="table-item-icon-inner-circle"></div>
                                </div>
                            </div>
                        </td>
                        <td className={`w-[${titleCol}%]`}>{row?.title}</td>
                        {
                            columns?.map((col)=>(
                                Object.keys(row)?.map((key,key_index)=>{
                                    if(key === col)
                                        if(Array.isArray(row[key])){
                                            return (
                                                <td className='w-[15%]'>
                                                    {
                                                        row[key]?.map((item)=>(
                                                            <p>{item?.value}</p>
                                                        ))
                                                    }
                                                </td>
                                            )
                                        }
                                    else{
                                        return (
                                            <td className='w-[15%]' key={key_index}>{row[key]}</td>
                                    )
                                    }
                                })
                            ))
                        }
                        <td className='w-[15%]'>
                            <div className="relative">
                                <select name="" id="" value={row?.status}>
                                    <option value="ACTIVE">Active</option>
                                    <option value="INACTIVE">Inactive</option>
                                </select>
                                <div className={`select-icon ${row?.status === "ACTIVE" ? "bg-primary": "bg-gray-400"}`}></div>
                            </div>
                        </td>
                        <td className='w-[15%]'>
                            <div className="table-actions">
                                <button className="table-actions-edit">
                                    <span className="table-action-edit-icon">
                                        <CiEdit size={"17px"} />
                                    </span>
                                    Edit
                                </button>
                                <button className="table-actions-delete">
                                    <CgTrashEmpty size={"17px"} />
                                </button>
                            </div>
                        </td>
                    </tr>
                ))
            }
            {/* <tr>
                <td className='w-[5%] '>
                    <div className="flex w-full items-center justify-center">
                        <div className="table-item-icon">
                            <div className="table-item-icon-inner-circle"></div>
                        </div>
                    </div>
                </td>
                <td className='w-[50%]'>Landing pages</td>
                <td className='w-[15%]'>10 Projects</td>
                <td className='w-[15%]'>
                    <div className="relative">
                        <select name="" id="">
                            <option value="">Active</option>
                            <option value="">Inactive</option>
                        </select>
                        <div className="select-icon"></div>
                    </div>
                </td>
                <td className='w-[15%]'>
                    <div className="table-actions">
                        <button className="table-actions-edit">
                            <span className="table-action-edit-icon">
                                <CiEdit size={"17px"} />
                            </span>
                            Edit
                        </button>
                        <button className="table-actions-delete">
                            <CgTrashEmpty size={"17px"} />
                        </button>
                    </div>
                </td>
            </tr>
            <tr>
                <td className='w-[5%] '>
                    <div className="flex w-full items-center justify-center">
                        <div className="table-item-icon">
                            <div className="table-item-icon-inner-circle"></div>
                        </div>
                    </div>
                </td>
                <td className='w-[50%]'>Live Projects</td>
                <td className='w-[15%]'>4 Projects</td>
                <td className='w-[15%]'>
                    <div className="relative">
                        <select name="" id="">
                            <option value="">Active</option>
                            <option value="">Inactive</option>
                        </select>
                        <div className="select-icon"></div>
                    </div>
                </td>
                <td className='w-[15%]'>
                    <div className="table-actions">
                        <button className="table-actions-edit">
                            <span className="table-action-edit-icon">
                                <CiEdit size={"17px"} />
                            </span>
                            Edit
                        </button>
                        <button className="table-actions-delete">
                            <CgTrashEmpty size={"17px"} />
                        </button>
                    </div>
                </td>
            </tr>
            <tr>
                <td className='w-[5%] '>
                    <div className="flex w-full items-center justify-center">
                        <div className="table-item-icon">
                            <div className="table-item-icon-inner-circle"></div>
                        </div>
                    </div>
                </td>
                <td className='w-[50%]'>Frontend Projects</td>
                <td className='w-[15%]'>16 Projects</td>
                <td className='w-[15%]'>
                    <div className="relative">
                        <select name="" id="">
                            <option value="">Active</option>
                            <option value="">Inactive</option>
                        </select>
                        <div className="select-icon"></div>
                    </div>
                </td>
                <td className='w-[15%]'>
                    <div className="table-actions">
                        <button className="table-actions-edit">
                            <span className="table-action-edit-icon">
                                <CiEdit size={"17px"} />
                            </span>
                            Edit
                        </button>
                        <button className="table-actions-delete">
                            <CgTrashEmpty size={"17px"} />
                        </button>
                    </div>
                </td>
            </tr>
            <tr>
                <td className='w-[5%] '>
                    <div className="flex w-full items-center justify-center">
                        <div className="table-item-icon">
                            <div className="table-item-icon-inner-circle"></div>
                        </div>
                    </div>
                </td>
                <td className='w-[50%]'>Personal Projects</td>
                <td className='w-[15%]'>3 Projects</td>
                <td className='w-[15%]'>
                    <div className="relative">
                        <select name="" id="">
                            <option value="">Active</option>
                            <option value="">Inactive</option>
                        </select>
                        <div className="select-icon"></div>
                    </div>
                </td>
                <td className='w-[15%]'>
                    <div className="table-actions">
                        <button className="table-actions-edit">
                            <span className="table-action-edit-icon">
                                <CiEdit size={"17px"} />
                            </span>
                            Edit
                        </button>
                        <button className="table-actions-delete">
                            <CgTrashEmpty size={"17px"} />
                        </button>
                    </div>
                </td>
            </tr> */}
        </tbody>
      </table>
    </div>
  )
}

export default Table
