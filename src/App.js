import React, { useState, useEffect } from 'react';
import supabase from './supabaseClient';

const App = () => {
  const [posts, setPosts] = useState([]); // Estado para las publicaciones
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [editPostId, setEditPostId] = useState(null);

  // Función para obtener las publicaciones desde la base de datos
  const fetchPosts = async () => {
    const { data, error } = await supabase.from('Posts').select('*');
    if (error) {
      console.error('Error al obtener las publicaciones:', error);
    } else {
      setPosts(data);
    }
  };

  // Efecto para obtener las publicaciones cuando se monta el componente
  useEffect(() => {
    fetchPosts();
  }, []);

  // Función para crear o actualizar una publicación
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (editPostId) {
      // Actualizar publicación existente
      const { error } = await supabase
        .from('Posts')
        .update({ title, body })
        .eq('id', editPostId);
      if (error) {
        console.error('Error al actualizar la publicación:', error);
      } else {
        fetchPosts(); // Actualizar la lista después de editar
        setTitle('');
        setBody('');
        setEditPostId(null); // Limpiar el estado de edición
      }
    } else {
      // Crear nueva publicación
      const { error } = await supabase.from('Posts').insert([{ title, body }]);
      if (error) {
        console.error('Error al crear la publicación:', error);
      } else {
        fetchPosts(); // Actualizar la lista después de crear
        setTitle('');
        setBody('');
      }
    }
  };

  // Función para eliminar una publicación
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('¿Estás seguro de que quieres eliminar esta publicación?');
    if (confirmDelete) {
      const { error } = await supabase.from('Posts').delete().eq('id', id);
      if (error) {
        console.error('Error al eliminar la publicación:', error);
      } else {
        fetchPosts(); // Actualizar la lista después de eliminar
      }
    }
  };

  // Función para cargar los datos de la publicación en el formulario para edición
  const handleEdit = (post) => {
    setTitle(post.title);
    setBody(post.body);
    setEditPostId(post.id); // Establecer el id para saber que estamos editando
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h1>Gestión de Publicaciones</h1>

      {/* Formulario para crear o actualizar publicaciones */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ padding: '10px', marginBottom: '10px', width: '100%' }}
        />
        <textarea
          placeholder="Contenido"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
          style={{ padding: '10px', marginBottom: '10px', width: '100%' }}
        />
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#007BFF',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
          }}
        >
          {editPostId ? 'Actualizar Publicación' : 'Crear Publicación'}
        </button>
      </form>

      {/* Mostrar las publicaciones */}
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '10px' }}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <button
              onClick={() => handleEdit(post)}
              style={{
                padding: '5px 10px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                marginRight: '10px',
              }}
            >
              Editar
            </button>
            <button
              onClick={() => handleDelete(post.id)}
              style={{
                padding: '5px 10px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
              }}
            >
              Eliminar
            </button>
          </div>
        ))
      ) : (
        <p>No hay publicaciones para mostrar.</p>
      )}
    </div>
  );
};

export default App;
