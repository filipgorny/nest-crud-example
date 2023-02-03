### Aplikacja zbudowana w NestJS z podstawowym CRUD'em.

# **Instalacja**

### 1. wymagany zainstalowany Node.js w wersji min. v16.13.2
### 2. wykorzystywana baza danych to PostgreSQL
### 3. należy skonfigurować pliki konfiguracyjne
  - zaktualizuj plik default.yml o informacje bazy danych

# **Zadanie rekrutacyjne**

## 1. Rozszerz obiekt kontaktu o nowe pola
  - dodaj nowe pole "phoneNumber" z walidacją
  - dodaj walidację do "email"
  - uaktualnij istniejący test e2e oraz stwórz nowy sprawdzający czy walidacja działa prawidłowo (jeden request ze złym "phoneNumber" i "email")

## 2. Dodaj informacje na temat adresów w kontakcie
  - stwórz nowy endpoint dzięki któremu można dodać wiele adresów do kontaktu, w respone powinny być one zwrócone z przypisanymi id
  - adres ma składać się z pól "city", "address", "postalCode"
  - adresy powinny być zapisywane w nowej tabeli w bazie danych
  - adresy mają być pobierane wraz z zapytaniem o kontakty
  - stwórz nowy test e2e sprawdzający dodawanie kilku adresów do istniejącego kontaktu

## 3. Optymalizacja aplikacji
  - stwórz nowy test dodający wiele (np. 10000, chodzi o długi czas wykonywania zapytania) kontaktów w jednym zapytaniu za pomocą "ContactsController.createMany"
  - znajdź problemy i zoptymalizuj aktualne rozwiązanie aby zapytanie wykonywało się szybciej
