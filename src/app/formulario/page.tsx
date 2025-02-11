'use client';
import { useState } from 'react';
import Head from 'next/head';

export default function Formulario() {
  const [formData, setFormData] = useState({
    fecha: '',
    hora: '',
    actividad: '',
    lugar: '',
    descripcion: '',
    flores: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateBlur = () => {
    if (formData.fecha) {
      const confirmed = window.confirm(
        "Favor verificar disponibilidad con el estimado. ¿La fecha es correcta?"
      );
      if (!confirmed) {
        setFormData({ ...formData, fecha: '' });
      }
    }
  };

  const isFormValid = () => {
    return (
      formData.fecha.trim() !== '' &&
      formData.hora.trim() !== '' &&
      formData.actividad.trim() !== '' &&
      formData.lugar.trim() !== '' &&
      formData.descripcion.trim() !== ''
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) {
      alert("Por favor, complete todos los campos antes de continuar.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        alert('Cita confirmada y email enviado, revisa tu correo');
        window.location.href = 'https://ephemeral-kleicha-39b29a.netlify.app';
      } else {
        alert('Error al enviar email');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al enviar email');
    }
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Formulario de Cita - San Valentín</title>
      </Head>
      <div className="form-page">
        <div className="form-container">
          <h1>JEJE, en esta ocasión podrás realizar tu propia cita :)</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="fecha">Fecha:</label>
              <input
                type="date"
                id="fecha"
                name="fecha"
                value={formData.fecha}
                onChange={handleChange}
                onBlur={handleDateBlur}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="hora">Hora:</label>
              <input
                type="time"
                id="hora"
                name="hora"
                value={formData.hora}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="actividad">Actividad:</label>
              <input
                type="text"
                id="actividad"
                name="actividad"
                value={formData.actividad}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lugar">Lugar:</label>
              <input
                type="text"
                id="lugar"
                name="lugar"
                value={formData.lugar}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="descripcion">Descripción:</label>
              <textarea
                id="descripcion"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="flores">Flores:</label>
              <input
                type="text"
                id="flores"
                name="flores"
                value={formData.flores}
                onChange={handleChange}
              />
            </div>
            <button type="submit" disabled={loading || !isFormValid()}>
              {loading ? 'Enviando...' : 'Finalizado'}
            </button>
          </form>
        </div>
      </div>

      <style jsx>{`
        .form-page {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: linear-gradient(
              to bottom right,
              rgba(255, 236, 238, 0.8),
              rgba(255, 245, 245, 0.8)
            ),
            url('https://img.freepik.com/premium-vector/happy-valentine-s-day-background_156037-17.jpg?w=1060')
            no-repeat center center;
          background-size: cover;
        }
        .form-container {
          background: rgba(255, 255, 255, 0.95);
          border: 2px solid #d14d44;
          border-radius: 10px;
          padding: 2rem;
          max-width: 500px;
          width: 90%;
          text-align: center;
        }
        .form-group {
          text-align: left;
          margin-bottom: 1rem;
        }
        label {
          font-weight: bold;
        }
        input, textarea {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #d14d44;
          border-radius: 5px;
        }
        button {
          background: #d14d44;
          color: white;
          padding: 0.75rem;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        button:disabled {
          background: gray;
        }
      `}</style>
    </>
  );
}