import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  Card,
  Badge,
  Dropdown,
  Button,
  Pagination,
  Form,
} from "react-bootstrap";
import {
  handleAccSampah,
  handleRejectSampah,
  handleInProgressSampah,
  getAllPelaporanAsync,
  getAllPelaporanSampahAsync,
  deleteSampahReportAsync,
} from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from "../loading/Loading";

const LaporanMasuk = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pelaporanSampah = useSelector((state) => state.auth.pelaporanSampah);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const error = useSelector((state) => state.auth.error);

  const [currentPage, setCurrentPage] = useState(1);
  const [reportsPerPage, setReportsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getAllPelaporanAsync());
    dispatch(getAllPelaporanSampahAsync());
  }, [dispatch]);

  const handleAccSampahClick = (id) => {
    if (id) {
      dispatch(handleAccSampah(id));
    }
  };

  const handleRejectSampahClick = (id) => {
    if (id) {
      dispatch(handleRejectSampah(id));
    }
  };

  const handleInProgressSampahClick = (id) => {
    if (id) {
      dispatch(handleInProgressSampah(id));
    }
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
          dispatch(deleteSampahReportAsync(id));
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

  const handleViewDetailClick = (id) => {
    if (id) {
      navigate(`/admin/laporan-sampah/detail/${id}`);
    }
  };

  const handleUpdateClick = (id) => {
    if (id) {
      navigate(`/admin/laporan-sampah/update/${id}`);
    }
  };

  const getBadgeVariant = (status) => {
    switch (status) {
      case "pending":
        return "danger";
      case "in_progress":
        return "warning";
      case "resolved":
        return "success";
      default:
        return "primary";
    }
  };

  const formatDate = (dateString) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  const singkatkanDeskripsi = (deskripsi, jumlahKata) => {
    return (
      deskripsi.split(" ").slice(0, jumlahKata).join(" ") +
      (deskripsi.split(" ").length > jumlahKata ? "..." : "")
    );
  };

  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const filteredReports = pelaporanSampah.filter((report) =>
    report.nama_pelapor.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const currentReports = filteredReports.slice(
    indexOfFirstReport,
    indexOfLastReport
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handlePerPageChange = (event) => {
    setReportsPerPage(parseInt(event.target.value));
    setCurrentPage(1);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
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
        <h1 className="h2">Data Laporan Sampah Masuk</h1>
      </div>

      <Card>
        <Card.Header>Tabel Data Laporan Masalah Sampah</Card.Header>
        <Card.Body>
          <div className="d-flex justify-content-between mb-3">
            <Form>
              <Form.Group controlId="searchForm">
                <Form.Label className="mr-2">Search:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Cari nama pelapor..."
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
                  value={reportsPerPage}
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
                  <th>Nama Pelaporan</th>
                  <th>Tanggal</th>
                  <th>Deskripsi</th>
                  <th>Status</th>
                  <th>Aksi Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {currentReports.map((row, index) => (
                  <tr key={index}>
                    <td style={{ textAlign: "center" }}>
                      {indexOfFirstReport + index + 1}
                    </td>
                    <td>{row.nama_pelapor}</td>
                    <td>{formatDate(row.created_at)}</td>
                    <td>{singkatkanDeskripsi(row.deskripsi, 4)}</td>
                    <td>
                      <Badge bg={getBadgeVariant(row.status)}>
                        {row.status}
                      </Badge>
                    </td>
                    <td>
                      <Dropdown>
                        <Dropdown.Toggle className="btn-sm">
                          Aksi
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item
                            onClick={() => handleAccSampahClick(row.id)}
                          >
                            Selesaikan Laporan
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => handleInProgressSampahClick(row.id)}
                          >
                            Laporan di Progres
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => handleRejectSampahClick(row.id)}
                          >
                            Batal Proses
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                    <td>
                      <Button
                        variant="info"
                        className="me-2 btn-sm"
                        onClick={() => handleViewDetailClick(row.id)}
                      >
                        <i className="fas fa-eye"></i>
                      </Button>
                      <Button
                        variant="warning"
                        className="me-2 btn-sm"
                        onClick={() => handleUpdateClick(row.id)}
                      >
                        <i className="fas fa-edit"></i>
                      </Button>
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

          <div className="d-flex justify-content-center">
            <Pagination>
              {Array.from(
                { length: Math.ceil(filteredReports.length / reportsPerPage) },
                (_, i) => (
                  <Pagination.Item
                    key={i + 1}
                    active={i + 1 === currentPage}
                    onClick={() => paginate(i + 1)}
                  >
                    {i + 1}
                  </Pagination.Item>
                )
              )}
            </Pagination>
          </div>
        </Card.Body>
      </Card>
    </main>
  );
};

export default LaporanMasuk;
