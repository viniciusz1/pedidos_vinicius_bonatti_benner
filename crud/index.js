const { initializeApp } = require('firebase/app');
const {
    getFirestore,
    collection,
    doc,
    setDoc,
    addDoc,
    query,
    where,
    getDocs,
    getDoc,
    deleteDoc
} = require('firebase/firestore/lite');

const firebaseConfig = {
    apiKey: "AIzaSyAui2gNU3_o8F3rsvBnfXj_AVZvn64Mn74",
    authDomain: "pedidos-60067.firebaseapp.com",
    projectId: "pedidos-60067",
    storageBucket: "pedidos-60067.appspot.com",
    messagingSenderId: "126914521592",
    appId: "1:126914521592:web:bd85de2e9219ac99a7ce0d",
    measurementId: "G-RKW52HKEYC"
  };


const app = initializeApp(firebaseConfig);

const db = getFirestore();

async function save(Tablename, id, dado) {
    if (id) {
        const referenceEntity = await setDoc(doc(db, Tablename, id), dado);
        const savedData = {
            ...dado,
            id: id
        }
        return savedData;
    } else {
        const referenceEntity = await addDoc(collection(db, Tablename), dado);
        const savedData = {
            ...dado,
            id: referenceEntity.id
        }
        return savedData;
    }
}

async function get(Tablename) {
    const TableRef = collection(db, Tablename);

    const q = query(TableRef);

    const querySnapshot = await getDocs(q);

    const lista = [];

    querySnapshot.forEach((doc) => {
        const data = {
            ...doc.data(),
            id: doc.id
        }
        lista.push(data);

    });
    return lista;
}

async function getWithFilter(Tablename, property, operator, value) {
    const TableRef = collection(db, Tablename);

    const q = query(TableRef, where(property, operator, value));

    const querySnapshot = await getDocs(q);

    const lista = [];

    querySnapshot.forEach((doc) => {
        const data = {
            ...doc.data(),
            id: doc.id
        }
        lista.push(data);

    });
    return lista;
}


async function getById(Tablename, id) {
    const docRef = doc(db, Tablename, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        throw new Error("404 - not found");
    }

}

async function remove(Tablename, id) {
    const dado = await deleteDoc(doc(db, Tablename, id));
    return {
        message: `${id} deleted`
    }
}


module.exports = {
    save,
    get,
    getById,
    remove,
    getWithFilter
}