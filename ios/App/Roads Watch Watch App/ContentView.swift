import SwiftUI

struct ContentView: View {
    @State var filteredData = [ParsedData]()
    
    var body: some View {
        NavigationView {
            List(filteredData, id: \.self) { parsedData in
                NavigationLink(destination: VerseView(url:parsedData.url ?? "a")) {
                    VStack(alignment: .leading) {
                        
                        Text(parsedData.title ?? "poop")
                            .font(.headline)
                        
                    }
                }
            }
            .onAppear {
                fetchData()
            }
        }.navigationTitle("POOPIES")
    }
    //ds
    
    func fetchData() {
        if let url = URL(string: "https://www.roadsbible.com/dashboard/") {
            URLSession.shared.dataTask(with: url) { data, response, error in
                if let error = error {
                    print("Error: \(error)")
                    // Handle the error gracefully here
                    return
                }
                
                if let data = data {
                    do {
                        let responseData = try JSONDecoder().decode(ResponseData.self, from: data)
                        let parsedDataArray = responseData.combined_data.flatMap { $0.parsedData }
                        self.filteredData = parsedDataArray.filter { $0.title != nil && $0.description != nil }
                    } catch {
                        print("JSON decoding error: \(error)")
                        // Handle the JSON decoding error here
                    }
                }
            }.resume()
        }
    }
}

struct ResponseData: Codable {
    let combined_data: [CombinedData]
}

struct CombinedData: Codable {
    let parsedData: [ParsedData]
    let numGroups: Int
    
    enum CodingKeys: String, CodingKey {
        case parsedData = "parsed_data"
        case numGroups = "num_groups"
    }
}

struct ParsedData: Codable, Hashable {
    var title: String?
    var url: String?
    var description: String?
    // Add other properties you want to decode from JSON
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
