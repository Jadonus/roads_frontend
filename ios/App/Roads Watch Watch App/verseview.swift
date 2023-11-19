import SwiftUI
import Foundation

struct VerseView: View {
    let url: String

    @State private var selectedVerse: Int = 0
    @State private var verses = [Final]()
@State private var first = false
    var body: some View {
        TabView(selection: $selectedVerse) {
            
                ForEach(0..<verses.count, id: \.self) { index in
                    ScrollView {
                        Text("\(verses[index].verse) \(!first ? verses[index].reference : "" )").padding()
                    }
                        .tag(index)
                        .toolbar {
                                   ToolbarItem(placement: .bottomBar) {
                                       Button(action: {
                                           firstletter()
                                       }) {
                                           Image(systemName: "wand.and.stars") // Choose an appropriate image
                                       }
                                   }
                            ToolbarItem(placement: .bottomBar) {
                                Button(action: {
print("STAR")
                                }) {
                                    Image(systemName: "star") // Choose an appropriate image
                                }
                            }
                               }
                    
                }
        }
        
        .tabViewStyle(.verticalPage)
        .onAppear() {
            fetchData()
        }
    }

    struct Final: Decodable, Hashable {
        var verse: String
        let reference: String
    }
    func firstletter() {
       let verseText = verses[selectedVerse].verse


        first.toggle()
        if first {
            let sanitizedResponse = verseText.replacingOccurrences(of: "\"", with: "")
                .replacingOccurrences(of: "(", with: "")
                .replacingOccurrences(of: ")", with: "")
            
            let words = sanitizedResponse.components(separatedBy: " ")
            let transformedWords = words.map { String($0.prefix(1)) }
            let transformedText = transformedWords.joined(separator: " ")
            
            if let index = verses.firstIndex(where: { $0.verse == verseText }) {
                selectedVerse = index
                verses[index].verse = transformedText.uppercased()
            }
        }else {
            if let index = verses.firstIndex(where: { $0.verse == verseText }) {
                selectedVerse = index
                verses[index].verse = "Loading..."
                fetchData()
            }
        }
    }
    func fetchData() {
        if let url = URL(string: "https://www.roadsbible.com/\(url)/") {
            var request = URLRequest(url: url)
            request.httpMethod = "POST"
            request.setValue("application/json", forHTTPHeaderField: "Content-Type")

            let parameters: [String: Any] = [
                "title": "Freedom",
                "username": "JadonGearhart",
                "custom": "no"
                // Add more parameters if needed
            ]

            do {
                request.httpBody = try JSONSerialization.data(withJSONObject: parameters)
                URLSession.shared.dataTask(with: request) { data, response, error in
                    if let error = error {
                        print("Error: \(error)")
                        return
                    }
                    if let data = data {
                        do {
                            let responseData = try JSONDecoder().decode(VerseData.self, from: data)
                            verses = responseData.verses
                            print(verses)
                        } catch {
                            print("JSON decoding error: \(error)")
                        }
                    }
                }.resume()
            } catch {
                print("Error serializing JSON: \(error)")
            }
        }
    }
}

struct VerseData: Decodable {
    let verses: [VerseView.Final]
}

#Preview {
    VerseView(url: "/roads/Freedom/")
}
