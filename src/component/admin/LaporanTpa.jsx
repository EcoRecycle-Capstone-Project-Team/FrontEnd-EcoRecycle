import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Card, Badge, Dropdown, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import {
  deletePelaporanAsync,
  getAllPelaporanAsync,
  getAllPelaporanSampahAsync,
  handleAcc,
  handleReject,
} from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";

const LaporanTpa = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pelaporan = useSelector((state) => state.auth.pelaporan);

  useEffect(() => {
    dispatch(getAllPelaporanAsync());
    dispatch(getAllPelaporanSampahAsync());
  }, [dispatch]);

  const handleAccClick = (id) => {
    if (id) {
      dispatch(handleAcc(id));
    }
  };

  const handleRejectClick = (id) => {
    if (id) {
      dispatch(handleReject(id));
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
          dispatch(deletePelaporanAsync(id));
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
      navigate(`/admin/laporan-tpa/detail/${id}`);
    }
  };

  const handleUpdateClick = (id) => {
    if (id) {
      navigate(`/admin/laporan-tpa/update/${id}`);
    }
  };

  const getBadgeVariant = (status) => {
    switch (status) {
      case "verify":
        return "success";
      case "not verify":
        return "danger";
      default:
        return "secondary";
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

  return (
    <main
      role="main"
      className="main-content col-md-9 ml-sm-auto col-lg-10 px-md-4"
    >
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Verifikasi Laporan Masuk</h1>
      </div>

      <Card>
        <Card.Header>Tabel Data Sebaran Lokasi TPA</Card.Header>
        <Card.Body style={{ marginTop: "-1rem" }}>
          <div className="table-responsive">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th style={{ width: "3rem", textAlign: "center" }}>No</th>
                  <th>Nama Pelaporan</th>
                  <th>Tanggal</th>
                  <th>Jenis TPA</th>
                  <th>Status</th>
                  <th>Verifikasi</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {pelaporan.map((row, index) => (
                  <tr key={index}>
                    <td style={{ textAlign: "center" }}>{index + 1}</td>
                    <td>{row.nama_pelapor}</td>
                    <td>{formatDate(row.created_at)}</td>
                    <td>{row.jenis_lokasi}</td>
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
                          <Dropdown.Item onClick={() => handleAccClick(row.id)}>
                            Verifikasi
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => handleRejectClick(row.id)}
                          >
                            Batal Verifikasi
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
        </Card.Body>
      </Card>
    </main>
  );
};

export default LaporanTpa;
