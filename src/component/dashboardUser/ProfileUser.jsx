import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserProfileAsync } from "../../redux/authSlice";
import { Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";

function ProfileUser() {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.auth.userProfile);

  const [profile, setProfile] = useState({
    username: "",
    email: "",
    phone_number: "",
    tanggal_lahir: "",
    alamat: "",
    jenis_kelamin: "",
    profile_photo: "",
  });

  useEffect(() => {
    if (userProfile) {
      setProfile({
        username: userProfile.name,
        email: userProfile.email,
        phone_number: userProfile.phone_number,
        tanggal_lahir: userProfile.tanggal_lahir,
        alamat: userProfile.alamat,
        jenis_kelamin: userProfile.jenis_kelamin,
        profile_photo: userProfile.profile_photo,
      });
    }
  }, [userProfile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProfile = {
      ...profile,
      name: profile.username,
    };
    dispatch(
      updateUserProfileAsync(
        userProfile.id,
        updatedProfile,
        localStorage.getItem("token")
      )
    )
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: "Profil berhasil diperbarui.",
          timer: 3000,
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Gagal!",
          text: `Terjadi kesalahan: ${error.message}`,
        });
      });
  };

  return (
    <>
      <section className="content">
        <div className="edit-profile-header">
          <h3 style={{ color: "#157347" }}>Lihat/Edit Profil</h3>
        </div>
        <hr className="content-divider" />
        <div className="edit-options">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName" style={{ marginTop: "10px" }}>
              <Form.Label>Nama</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={profile.username}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formEmail" style={{ marginTop: "10px" }}>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                disabled
              />
            </Form.Group>
            <Form.Group
              controlId="formPhoneNumber"
              style={{ marginTop: "10px" }}
            >
              <Form.Label>Nomor Telepon</Form.Label>
              <Form.Control
                type="text"
                name="phone_number"
                value={profile.phone_number || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group
              controlId="formTanggalLahir"
              style={{ marginTop: "10px" }}
            >
              <Form.Label>Tanggal Lahir</Form.Label>
              <Form.Control
                type="date"
                name="tanggal_lahir"
                value={profile.tanggal_lahir || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formAlamat" style={{ marginTop: "10px" }}>
              <Form.Label>Alamat</Form.Label>
              <Form.Control
                type="text"
                name="alamat"
                value={profile.alamat || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group
              controlId="formJenisKelamin"
              style={{ marginTop: "10px" }}
            >
              <Form.Label>Jenis Kelamin</Form.Label>
              <Form.Control
                as="select"
                name="jenis_kelamin"
                value={profile.jenis_kelamin || ""}
                onChange={handleChange}
              >
                <option value="">Pilih</option>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </Form.Control>
            </Form.Group>
            <hr className="content-divider" style={{ marginTop: "40px" }} />
            <div className="button-container">
              <Button variant="danger" type="submit">
                Simpan Pembaruan
              </Button>
            </div>
          </Form>
        </div>
      </section>
    </>
  );
}

export default ProfileUser;
