# Use Nginx to serve static files
FROM nginx:alpine

# Copy frontend files to Nginx public directory
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Run Nginx
CMD ["nginx", "-g", "daemon off;"]
