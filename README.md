[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=17556782&assignment_repo_type=AssignmentRepo)
# Table of Contents

- [Introduction](#introduction)  
- [Event Field Mapping Documentation](#event-field-mapping-documentation)  
- [Event Enums Table Documentation](#event-enums-table-documentation)  
- [Smoke Test for Back-End API](#smoke-test-for-back-end-api)  
- [API Documentation for Front-End Developers](#api-documentation-for-front-end-developers)  

## Introduction

Aplikacja znajduje się obecnie w fazie testowej. 
Dane z formularzy rejestracyjnych są pomyślnie zapisywane w bazie danych, gdy JSON-y są wysyłane za pomocą Postmana. 
Jednakże integracja front-endu z back-endem w tej wersji nie działa – funkcjonalność była dostępna w poprzedniej wersji dla jednego formularza. 
Dodatkowo, implementacja back-endu dla logowania została przełożona i nie została jeszcze napisana.

# Event Field Mapping Documentation
This table provides the mapping of fields used for different events in both Polish and English.

| **Event Name**                | **Polish Name**                  | **English Name**               |
|-------------------------------|-----------------------------------|---------------------------------|
| Dzień otwartych drzwi         | Kierunek                         | field_of_study                 |
| Międzynarodowa konferencja IT | Wybierz workshopy                | workshops                      |
| Międzynarodowa konferencja IT | Firma                            | company                        |
| Festival letni                | Typ biletu                       | ticket_type                    |
| Warsztaty UI/UX Design        | Poziom doświadczenia             | experience_level               |
| Międzynarodowy klub językowy  | Wybierz języki                   | languages                      |
| Seminarium przedsiębiorczości | Obszar zainteresowań             | area_of_interest               |
| Maraton uniwersytecki         | Wybierz dystans                  | distance                       |
| Wystawa sztuki studenckiej    | Zainteresowania artystyczne      | artistic_interests             |
| Dzień kariery                 | Udział w warsztatach CV          | participation_in_cv_workshops  |
| Dzień kariery                 | Obszar zainteresowań zawodowych  | professional_area_of_interest  |


# Event Enums Table Documentation
This table outlines the enumerated values for specific fields in various events.

| **Event Name**                | **Field in the data base** | **Enum Values**                                                             |
|-------------------------------|-------------|-----------------------------------------------------------------------------|
| Dzień otwartych drzwi         | field_of_study | Technologie informatyczne , Biznes i zarządzanie, Ekonomia, Język angielski |
| Międzynarodowa konferencja IT | workshops   | AI i ML, Cyberbezpieczeństwo, Cloud Computing                               |
| Festiwal letni                | ticket_type | Student (Darmowy), Gościnny (20 PLN), VIP (50 PLN)                          |
| Warsztaty UI/UX Design        | experience_level | Początkujący, Średniozaawansowany, Zaawansowany                             |
| Międzynarodowy klub językowy  | languages   | Angielski, Niemiecki, Hiszpański, Francuski, Włoski                         |
| Seminarium przedsiębiorczości | area_of_interest | Start-up, Marketing, Finanse, Zarządzanie                                   |
| Maraton uniwersytecki         | distance    | 5 km - bieg rekreacyjny, 10 km - bieg główny, 21 km - półmaraton            |
| Wystawa sztuki studenckiej    | artistic_interests | Malarstwo, Rzeźba, Fotografia, Sztuka cyfrowa                               |
| Dzień kariery                 | participation_in_cv_workshops | Tak, Nie                                                                    |
| Dzień kariery                 | professional_area_of_interest | IT, Finanse, Marketing, HR, Consulting                                      |

# Smoke Test for Back-End API

## Purpose
This smoke test ensures that the back-end API correctly handles data insertion into the `registration` table and provides accurate retrieval of records via database queries and API endpoints.

---

## Steps

### 1. Send POST Requests
Send the following JSON payloads to the `/api/register` endpoint to simulate user registrations:

#### Example 1:
```json
{
  "event_name": "Dzień otwartych drzwi",
  "name": "Jan Kowalski",
  "email": "jan.kowalski@example.com",
  "phone": "123456789",
  "field_of_study": "Technologie informatyczne"
}
```


#### Example 2:
```json
{
  "event_name": "Festiwal letni",
  "name": "Katarzyna Wiśniewska",
  "email": "katarzyna.wisniewska@example.com",
  "phone": "456789123",
  "ticket_type": "VIP (50 PLN)"
}
```

### 2. Verify API Response
Ensure the API responds with:
```json
{
  "message": "Registration successful!"
}
```

### 3. Query the Database
Run the following query in the SQLite database to retrieve all records from the `registration` table:
```sql
SELECT * FROM registration;
```

### 4.Validate the results:
Ensure the records from the two JSON examples are present in the table, with the correct values for all fields.

---

### Expected Outcome:
API responses confirm successful registrations.
Query results in the registration table display the two inserted records with matching field values.

### Note
Also, you can verify that a record is delivered to the data base by GET request to /api/registrations (http://127.0.0.1:5000/api/registrations)

# API Documentation for Front-End Developers

This document provides instructions for integrating the back-end registration API with the front-end application.

---

## API Endpoint
**URL:** `/api/register`  
**Method:** `POST`  
**Content-Type:** `application/json`

---

## Request Structure
The front-end should send JSON payloads to the `/api/register` endpoint with the following fields:

| **Field**                       | **Type**     | **Description**                                                                 |
|----------------------------------|--------------|---------------------------------------------------------------------------------|
| `event_name`                    | `string`     | The name of the event. Must match predefined event names in the system.         |
| `name`                          | `string`     | The full name of the registrant.                                                |
| `email`                         | `string`     | The email address of the registrant.                                            |
| `phone`                         | `string`     | (Optional) The phone number of the registrant.                                  |
| `field_of_study`                | `string`     | (Optional) Required for "Dzień otwartych drzwi". Enum values are predefined.    |
| `company`                       | `string`     | (Optional) Required for "Międzynarodowa konferencja IT".                        |
| `workshops`                     | `string`     | (Optional) Required for "Międzynarodowa konferencja IT". Enum values are predefined. |
| `ticket_type`                   | `string`     | (Optional) Required for "Festiwal letni". Enum values are predefined.           |
| `experience_level`              | `string`     | (Optional) Required for "Warsztaty UI/UX Design". Enum values are predefined.   |
| `languages`                     | `string`     | (Optional) Required for "Międzynarodowy klub językowy". Enum values are predefined. |
| `area_of_interest`              | `string`     | (Optional) Required for "Seminarium przedsiębiorczości". Enum values are predefined. |
| `distance`                      | `string`     | (Optional) Required for "Maraton uniwersytecki". Enum values are predefined.    |
| `artistic_interests`            | `string`     | (Optional) Required for "Wystawa sztuki studenckiej". Enum values are predefined. |
| `participation_in_cv_workshops` | `string`     | (Optional) Required for "Dzień kariery". Enum values are predefined.            |
| `professional_area_of_interest` | `string`     | (Optional) Required for "Dzień kariery". Enum values are predefined.            |

---

## Example Payloads

### Example 1: "Dzień otwartych drzwi"
```json
{
  "event_name": "Dzień otwartych drzwi",
  "name": "Jan Kowalski",
  "email": "jan.kowalski@example.com",
  "phone": "123456789",
  "field_of_study": "Technologie informatyczne"
}
