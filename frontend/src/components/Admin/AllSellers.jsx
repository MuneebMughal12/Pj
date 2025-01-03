import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@material-ui/data-grid";
import { Button } from "@material-ui/core";
import styles from "../../styles/styles";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { getAllSellers } from "../../redux/actions/sellers";

const AllSellers = () => {
  const dispatch = useDispatch();
  const { sellers } = useSelector((state) => state.seller);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    dispatch(getAllSellers());
  }, [dispatch]);

  const handleStatusChange = async (id, newStatus) => {
    await axios
      .put(
        `${server}/shop/update-status/${id}`,
        { status: newStatus },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message);
        dispatch(getAllSellers());
      });
  };
  const handleApprove = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/approve-shop/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Approved" }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error approving shop:", error);
    }
  };
  
  
  const handleReject = async (id) => {
    try {
      const response = await axios.put(`/approve-shop/${id}`, {
        status: "Rejected",
      });
      alert(response.data.message); // Show rejection message
    } catch (error) {
      console.error(error);
      alert("Failed to reject shop.");
    }
  };
  

  const columns = [
    { field: "id", headerName: "Seller ID", minWidth: 150, flex: 0.7 },
    { field: "name", headerName: "Name", minWidth: 130, flex: 0.7 },
    { field: "email", headerName: "Email", minWidth: 150, flex: 1 },
    { field: "address", headerName: "Address", minWidth: 150, flex: 1 },
    { field: "status", headerName: "Status", minWidth: 130, flex: 0.7 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: (params) => {
        return (
          <div className="flex items-center gap-2">
            {params.row.status === "Pending" && (
              <Button
                className={`${styles.button}`}
                onClick={() => handleApprove(params.id, "Active")}
              >
                Approve
              </Button>
            )}
            {params.row.status !== "Blocked" && (
              <Button
                className={`${styles.button} bg-red-500`}
                onClick={() => handleReject(params.id, "Blocked")}
              >
                Block
              </Button>
            )}
            {params.row.status === "Blocked" && (
              <Button
                className={`${styles.button} bg-green-500`}
                onClick={() => handleStatusChange(params.id, "Active")}
              >
                Activate
              </Button>
            )}
          </div>
        );
      },
    },
  ];

  const filteredRows =
    statusFilter === "all"
      ? sellers
      : sellers.filter((seller) => seller.status === statusFilter);

  const rows = filteredRows.map((item) => ({
    id: item._id,
    name: item.name,
    email: item.email,
    address: item.address,
    status: item.status,
  }));

  return (
    <div className="w-full flex justify-center pt-5">
      <div className="w-[97%]">
        <h3 className="text-[22px] font-Poppins pb-2">All Sellers</h3>
        <div className="flex gap-4 mb-4">
          <Button
            className={`${styles.button}`}
            onClick={() => setStatusFilter("all")}
          >
            All
          </Button>
          <Button
            className={`${styles.button}`}
            onClick={() => setStatusFilter("Active")}
          >
            Active
          </Button>
          <Button
            className={`${styles.button}`}
            onClick={() => setStatusFilter("Pending")}
          >
            Pending
          </Button>
          <Button
            className={`${styles.button}`}
            onClick={() => setStatusFilter("Blocked")}
          >
            Blocked
          </Button>
        </div>
        <div className="w-full min-h-[45vh] bg-white rounded">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>
      </div>
    </div>
  );
};

export default AllSellers;
