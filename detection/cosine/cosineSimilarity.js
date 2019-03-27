/*
* INPUTS
* docWords: String Array for the document being checked for plagiarism
* compareWords: String Array for the document being compared to
*
* OUTPUTS
* similarity: Number showing the similarity between the inputs
*/

module.exports = function cosineSimilarity(docWords, compareWords)
{
	//Create Word Frequency lists
	//list[word] = frequency
	var docWordFrequency = new Object();
	var compareWordFrequency = new Object();
	
	//Populate Word Frequency lists
	for (sentence in docWords)
	{
		docWords[sentence] = docWords[sentence].split(" ");
		for (word in docWords[sentence])
		{
			if (isNaN(docWordFrequency[docWords[word]]))
			{
				docWordFrequency[docWords[word]] = 1;
			}
			else
			{
				docWordFrequency[docWords[word]]++;
			}
		}
	}

	for (sentence in compareWords)
	{
		compareWords[sentence] = compareWords[sentence].split(" ");
		for (word in compareWords[sentence])
		{
			if (isNaN(compareWordFrequency[compareWords[word]]))
			{
				compareWordFrequency[compareWords[word]] = 1;
			}
			else
			{
				compareWordFrequency[compareWords[word]]++;
			}
		}
	}
	
	//Normalize Word Frequency lists
	var normalizeDoc = 0;
	for (word in docWordFrequency)
	{
		normalizeDoc += docWordFrequency[word]**2;
	}
	normalizeDoc = Math.sqrt(normalizeDoc);
    for (word in docWordFrequency)
    {
    	docWordFrequency[word] = docWordFrequency[word] / normalizeDoc;
    }
    
	var normalizeCompare = 0;
	for (word in compareWordFrequency)
	{
		normalizeCompare += compareWordFrequency[word]**2;
	}
	normalizeCompare = Math.sqrt(normalizeCompare);
    for (word in compareWordFrequency)
    {
    	compareWordFrequency[word] = compareWordFrequency[word] / normalizeCompare;
    }
    
	//Multiply normalized frequencies, per word shared
	var similarity = 0;
	for (word in docWordFrequency)
	{
		if (compareWordFrequency[word] != undefined)
		{
			similarity += docWordFrequency[word] * compareWordFrequency[word];
		}
	}
	
	return similarity;
}