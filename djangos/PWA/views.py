from rest_framework.decorators import api_view
from rest_framework.response import Response
from nltk import ngrams



@api_view(['POST'])
def get_ngrams(request):
    text1 = request.data.get('text1')
    text2 = request.data.get('text2')
    
    if text1 is None or text2 is None:
        return Response({'error': 'Invalid request. Missing text1 or text2.'})
    
    # Tokenize the texts and generate ngrams
    tokens1 = text1.split()
    tokens2 = text2.split()
    ngrams1 = list(ngrams(tokens1, 2))  # Modify the number in ngrams() for the desired n-gram size
    ngrams2 = list(ngrams(tokens2, 2))  # Modify the number in ngrams() for the desired n-gram size
    
    # Compare the ngrams and return the result
    common_ngrams = set(ngrams1).intersection(ngrams2)
    return Response(list(common_ngrams))
