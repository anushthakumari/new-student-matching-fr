import {
	collection,
	getDoc,
	doc,
	getDocs,
	query,
	where,
	addDoc,
	serverTimestamp,
} from "firebase/firestore";

import { firestore } from "../firebase.config";

const users_schema = {
	name: "new_match_users",
	fields: {
		email: "email",
		pass: "pass",
		firstName: "firstName",
		lastName: "lastName",
	},
};

export default users_schema;

export const insert_user = async (
	email = "",
	pass = "",
	firstName,
	lastName
) => {
	const collRef = collection(firestore, users_schema.name);
	const docRef = await addDoc(collRef, {
		email,
		pass,
		firstName,
		lastName,
		created_at: serverTimestamp(),
	});

	return docRef.id;
};

export const fetch_user_by_email = async (email = "") => {
	const usersRef = collection(firestore, users_schema.name);
	const q = query(usersRef, where(users_schema.fields.email, "==", email));
	const { size, docs } = await getDocs(q);

	if (size) {
		return { ...docs[0].data(), doc_id: docs[0].id };
	}

	return null;
};
