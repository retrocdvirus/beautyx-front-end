import { createServer } from "miragejs";

export default function setupMirage() {
  createServer({
    routes() {
      this.get("/api/spa-shops", (schema, request) => {
        const searchTerm = request.queryParams.searchTerm;

        // Return an array of spa shops that match the search term
        const spaShops = [
          {
            id: 1,
            name: "Spa Shop 1",
            description: "Description for Spa Shop 1",
            image: "/src/img/SpaImg.jpg",
          },
          {
            id: 2,
            name: "Spa Shop 2",
            description: "Description for Spa Shop 2",
            image: "/src/img/SpaImg.jpg",
          },
          {
            id: 3,
            name: "Spa Shop 3",
            description: "Description for Spa Shop 3",
            image: "/src/img/SpaImg.jpg",
          },
          {
            id: 4,
            name: "Spa Shop 4",
            description: "Description for Spa Shop 3",
            image: "/src/img/SpaImg.jpg",
          },
          {
            id: 5,
            name: "Spa Shop 5",
            description: "Description for Spa Shop 3",
            image: "/src/img/SpaImg.jpg",
          },
          {
            id: 6,
            name: "Spa Shop 6",
            description: "Description for Spa Shop 3",
            image: "/src/img/SpaImg.jpg",
          },
          {
            id: 7,
            name: "Spa Shop 7",
            description: "Description for Spa Shop 3",
            image: "/src/img/SpaImg.jpg",
          },
          {
            id: 8,
            name: "Spa Shop 8",
            description: "Description for Spa Shop 3",
            image: "/src/img/SpaImg.jpg",
          },
        ];
        return spaShops.filter((spaShop) =>
          spaShop.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    },
  });
}
