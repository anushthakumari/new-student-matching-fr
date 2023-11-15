const munkres = require("munkres-js");

export function findOptimalMatches(userObjects, targetDocId) {
	const prefMat = creating_preference_mat(userObjects, userObjects);

	console.log("Preference Matrix:", prefMat);

	// Finding optimal matches using the Hungarian Algorithm
	const optimalMatchesIndices = linearSumAssignment(prefMat);

	console.log("Optimal Matches Indices:", optimalMatchesIndices);

	// Collecting the optimal matches with full user details
	const optimalMatches = [];
	for (let i = 0; i < optimalMatchesIndices.length; i++) {
		const usersIndexesArray = optimalMatchesIndices[i];
		// const user2IndexArray = optimalMatchesIndices[i];

		// Assuming each user in grp1 is matched with only one user in grp2
		// const user2Index = user2IndexArray[0];

		optimalMatches.push({
			user1: userObjects[usersIndexesArray[0]],
			user2: userObjects[usersIndexesArray[1]],
		});
	}

	const match = optimalMatches.find(
		(pair) =>
			pair.user1.doc_id === targetDocId || pair.user2.doc_id === targetDocId
	);

	if (match) {
		const nonMatchingUser =
			match.user1.doc_id === targetDocId ? match.user2 : match.user1;
		return nonMatchingUser;
	}

	// If no match found, return null or handle accordingly
	return null;
}

// Function to find optimal matches using the Hungarian Algorithm
function linearSumAssignment(costMatrix) {
	const indices = munkres(costMatrix);
	return indices;
}

// Dividing users into two groups, so that bipartite matching can be applied
function split_groups(userList) {
	const grp1 = [];
	const grp2 = [];
	for (var i = 0; i < userList.length; i++) {
		if (i % 2 === 0) grp1.push(userList[i]);
		else grp2.push(userList[i]);
	}
	return [grp1, grp2];
}

// Creating preference matrix
function creating_preference_mat(grp1, grp2) {
	const preferences = [];
	for (let i = 0; i < grp1.length; i++) {
		const user1 = grp1[i];
		const comparision = [];
		for (let j = 0; j < grp2.length; j++) {
			const user2 = grp2[j];

			// Exclude self-comparisons
			if (i !== j) {
				let weights = 0;

				// Compare preferences and calculate weights
				if (user1.honesty !== user2.honesty) weights++;
				if (user1.emotional !== user2.emotional) weights++;
				if (user1.extraversion !== user2.extraversion) weights++;
				if (user1.agreeableness !== user2.agreeableness) weights++;
				if (user1.consc !== user2.consc) weights++;
				if (user1.openness !== user2.openness) weights++;

				comparision.push(weights);
			} else {
				// If self-comparison, add a high weight (indicating high dissimilarity)
				comparision.push(999); // Adjust the value as needed
			}
		}
		preferences.push(comparision);
	}
	return preferences;
}

// Example user objects
// const userObjects = [
// 	{
// 		honesty: false,
// 		emotional: false,
// 		extraversion: false,
// 		agreeableness: false,
// 		consc: false,
// 		openness: false,
// 		// other properties...
// 	},
// 	// other user objects...
// ];

// // Finding optimal matches
// const optimalMatches = findOptimalMatches(userObjects);
// console.log("Optimal Match:", optimalMatches);
