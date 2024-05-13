// Configura la información de tu proyecto Firebase
const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "TU_AUTH_DOMAIN",
    projectId: "TU_PROJECT_ID",
    storageBucket: "TU_STORAGE_BUCKET",
    messagingSenderId: "TU_MESSAGING_SENDER_ID",
    appId: "TU_APP_ID"
  };
  
  // Inicializa Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Referencia al servicio de autenticación de Firebase
  const auth = firebase.auth();
  
  // Referencia al servicio de almacenamiento de Firebase
  const storage = firebase.storage();
  
  // Función para registrar nuevos usuarios
  function signUp(email, password) {
    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log('Usuario registrado:', userCredential.user.uid);
      })
      .catch((error) => {
        console.error('Error al registrar usuario:', error);
      });
  }
  
  // Función para subir imágenes
  function uploadImage(file) {
    const imageName = new Date().getTime() + '-' + file.name;
    const storageRef = storage.ref('images/' + imageName);
    const uploadTask = storageRef.put(file);
    uploadTask.on('state_changed',
      (snapshot) => {
        // Maneja el progreso de la carga
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Carga de imagen:', progress + '% completada');
      },
      (error) => {
        // Maneja errores de carga
        console.error('Error al subir imagen:', error);
      },
      () => {
        // La carga se completó correctamente
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log('URL de descarga de la imagen:', downloadURL);
        });
      }
    );
  }
  
  // Maneja el evento de envío del formulario de registro de usuarios
  document.getElementById('signupForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    signUp(email, password);
  });
  
  // Maneja el evento de envío del formulario de carga de imágenes
  document.getElementById('uploadForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const file = document.getElementById('imageFile').files[0];
    if (file) {
      uploadImage(file);
    }
  });
  




  
