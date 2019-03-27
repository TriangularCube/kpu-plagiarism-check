/*
* INPUTS
* docWords: String Array of sentences for the document being checked for plagiarism
* compareWords: String Array of sentences for the document being compared to
*
* OUTPUTS
* similarity: Number showing the similarity between the inputs
*/

module.exports = function diceSimilarity(docWords, compareWords)
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
			if (isNaN(docWordFrequency[docWords[sentence][word]]))
			{
				docWordFrequency[docWords[sentence][word]] = 1;
			}
			else
			{
				docWordFrequency[docWords[sentence][word]]++;
			}
		}
	}

	for (sentence in compareWords)
	{
		compareWords[sentence] = compareWords[sentence].split(" ");
		for (word in compareWords[sentence])
		{
			if (isNaN(compareWordFrequency[compareWords[sentence][word]]))
			{
				compareWordFrequency[compareWords[sentence][word]] = 1;
			}
			else
			{
				compareWordFrequency[compareWords[sentence][word]]++;
			}
		}
	}

	//Count number of words that appear in both documents
    //A word used more than once in a document is only counted the first time
    var similarity = 0;
    for (word in docWordFrequency)
    {
    	if (compareWordFrequency[word] != undefined)
			{
				similarity += 2;
			}
    }
    
    //Count total words used among both documents
    var totalWords = 0;
    for (word in docWordFrequency)
    {
    	totalWords += docWordFrequency[word];
    }
    for (word in compareWordFrequency)
    {
    	totalWords += compareWordFrequency[word];
    }
    
    similarity /= totalWords;
	return similarity;
}