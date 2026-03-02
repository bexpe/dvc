# Używamy lekkiego Nginx
FROM nginx:alpine

# Kopiujemy wszystkie pliki sklepu do katalogu serwowanego przez Nginx
COPY ./ /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Uruchomienie Nginx w pierwszym planie
CMD ["nginx", "-g", "daemon off;"]