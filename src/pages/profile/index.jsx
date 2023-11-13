import React from "react";

import PersonalDetails from "./PersonalDetails";
import EducationalDetails from "./EducationalDetails";

import DashLayout from "../../layouts/DashLayout";

function Profile() {
	return (
		<DashLayout>
			<PersonalDetails />
			<br />
			<br />
			<EducationalDetails />
		</DashLayout>
	);
}

export default Profile;
