import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Card, Button, Form } from "react-bootstrap";
import { deleteUserAsync, getAllUsersAsync } from "../../redux/authSlice";
import Swal from "sweetalert2";
import Loading from "../loading/Loading";

const UserAll = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.auth.users);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const error = useSelector((state) => state.auth.error);
  const token = localStorage.getItem("token");

  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getAllUsersAsync());
  }, [dispatch]);

  const formatDate = (dateString) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  const handleDeleteClick = (id) => {
    if (id) {
      Swal.fire({
        title: "Apakah Anda yakin?",
        text: "Anda tidak akan dapat mengembalikan ini!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, hapus!",
        cancelButtonText: "Batal",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(deleteUserAsync(id, token));
          Swal.fire({
            title: "Dihapus!",
            text: "Data Anda telah dihapus.",
            icon: "success",
            timer: 2000,
          });
        }
      });
    }
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handlePerPageChange = (event) => {
    setUsersPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;
  }

  return (
    <main
      role="main"
      className="main-content col-md-9 ml-sm-auto col-lg-10 px-md-4"
    >
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Data Pengguna</h1>
      </div>

      <Card>
        <Card.Header>
          <div className="d-flex justify-content-between align-items-center">
            <span>Tabel Data Pengguna</span>
          </div>
        </Card.Header>
        <Card.Body>
          <div className="d-flex justify-content-between mb-3">
            <Form>
              <Form.Group controlId="searchForm">
                <Form.Label className="mr-2">Search:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Cari nama pengguna..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </Form.Group>
            </Form>
            <Form>
              <Form.Group controlId="perPageForm">
                <Form.Label className="mr-2">Entri per Halaman:</Form.Label>
                <Form.Control
                  as="select"
                  value={usersPerPage}
                  onChange={handlePerPageChange}
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={30}>30</option>
                  <option value={50}>50</option>
                </Form.Control>
              </Form.Group>
            </Form>
          </div>

          <div className="table-responsive">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th style={{ width: "3rem", textAlign: "center" }}>No</th>
                  <th>Nama</th>
                  <th>Email</th>
                  <th>No. TLP</th>
                  <th>Jenis Kelamin</th>
                  <th>Tanggal Buat</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((row, index) => (
                  <tr key={index}>
                    <td style={{ textAlign: "center" }}>
                      {indexOfFirstUser + index + 1}
                    </td>
                    <td>{row.username}</td>
                    <td>{row.email}</td>
                    <td>{row.phone_number}</td>
                    <td>{row.jenis_kelamin}</td>
                    <td>{formatDate(row.createdAt)}</td>
                    <td>
                      <Button
                        className="btn-sm"
                        variant="danger"
                        onClick={() => handleDeleteClick(row.id)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          <ul className="pagination justify-content-center">
            {Array.from(
              { length: Math.ceil(filteredUsers.length / usersPerPage) },
              (_, i) => (
                <li
                  key={i}
                  className={`page-item ${
                    currentPage === i + 1 ? "active" : ""
                  }`}
                >
                  <button onClick={() => paginate(i + 1)} className="page-link">
                    {i + 1}
                  </button>
                </li>
              )
            )}
          </ul>
        </Card.Body>
      </Card>
    </main>
  );
};

export default UserAll;
