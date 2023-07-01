from django.http import JsonResponse


def ngrams(request):
    if request.method == 'POST':
        
        # Retrieve the 'data' field from the request's POST data
        data = request.POST.get('data')

        # Process the data and generate the desired response
        # For example, you can perform calculations, access the database, etc.

        # Create a response dictionary
        response_data = {
            'message': 'Ngrams processed successfully',
            'data': data,  # Include any processed data you want to send back
        }

        # Return the response as JSON
        return JsonResponse(response_data)

    # Handle other HTTP methods if needed
    return JsonResponse({'message': 'Invalid method'}, status=405)
