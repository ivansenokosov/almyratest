import requests
from django.http import HttpResponse

def payadmit(request):
    url = "https://app-demo.payadmit.com/api/v1/payments"

    headers = {
        "accept": "application/json",
        "content-type": "application/json",
        "Authorization": "Bearer kX7SWzlBdULAdn6eRTRheCW4eI7O5KfB"
    }

    payload = {
        "paymentType": "DEPOSIT",
        "paymentMethod": "BASIC_CARD",
        "amount": 114,
        "currency": "EUR"
    }
    # # response = requests.get(url, headers=headers)

    response = requests.post(url, json=payload, headers=headers)

    print(response.text)
    html = "<html><body>It is now qqqq</body></html>"
    return HttpResponse(response.text)
