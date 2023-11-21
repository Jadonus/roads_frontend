import WidgetKit
import SwiftUI

// Define a struct to represent the API response
struct ApiResponse: Codable {
    let verse: VerseDetails
}

struct VerseDetails: Codable {
    let details: VerseInfo
}

struct VerseInfo: Codable {
    let reference: String
    let text: String
}
struct TextProvider: TimelineProvider {
    var backgroundColor: Color = .white

    func placeholder(in context: Context) -> SimpleEntry {
        SimpleEntry(date: Date(), reference: "Psalm 23:1", text: "The LORD is my shepherd, I shall not be in want")
    }

    func getSnapshot(in context: Context, completion: @escaping (SimpleEntry) -> ()) {
        let entry = SimpleEntry(date: Date(), reference: "Psalm 23:1", text: "The LORD is my shepherd, I shall not be in want")
        completion(entry)
    }
    func getTimeline(in context: Context, completion: @escaping (Timeline<SimpleEntry>) -> ()) {
        // Fetch the reference and text from the API
        fetchReference { reference, text in
            // Create a timeline entry with the fetched reference and text
            let entry = SimpleEntry(date: Date(), reference: reference, text: text)
            let timeline = Timeline(entries: [entry], policy: .atEnd)
            completion(timeline)
        }
        
        func fetchReference(completion: @escaping (String, String) -> Void) {
            if let url = URL(string: "https://beta.ourmanna.com/api/v1/get?format=json&order=daily") {
                let session = URLSession.shared
                let task = session.dataTask(with: url) { (data, response, error) in
                    if let error = error {
                        print("Error: \(error.localizedDescription)")
                        completion("", "") // Return empty strings in case of an error
                        return
                    }
                    
                    if let data = data {
                        do {
                            let apiResponse = try JSONDecoder().decode(ApiResponse.self, from: data)
                            let reference = apiResponse.verse.details.reference
                            let text = apiResponse.verse.details.text // Get the fetched text
                            completion(reference, text) // Pass both reference and text
                        } catch {
                            print("Error parsing JSON: \(error.localizedDescription)")
                            completion("", "") // Return empty strings in case of a parsing error
                        }
                    }
                }
                task.resume()
            } else {
                print("Invalid URL")
                completion("", "") // Return empty strings in case of an invalid URL
            }
        }
        
    }
    }
struct Provider: TimelineProvider {
    var backgroundColor: Color = .white // Default color is white

    func placeholder(in context: Context) -> SimpleEntry {
        SimpleEntry(date: Date(), reference: "Psalm 23:1", text: "The LORD is my shepherd, I shall not be in want")
    }

    func getSnapshot(in context: Context, completion: @escaping (SimpleEntry) -> ()) {
        let entry = SimpleEntry(date: Date(), reference: "Psalm 23:1", text: "The LORD is my shepherd, I shall not be in want")
        completion(entry)
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<SimpleEntry>) -> ()) {
        // Fetch the reference and text from the API
        fetchReference { reference, text in
            // Create a timeline entry with the fetched reference and text
            let entry = SimpleEntry(date: Date(), reference: reference, text: text)
            let timeline = Timeline(entries: [entry], policy: .atEnd)
            completion(timeline)
        }
    }

    // Function to fetch the reference and text from the API
    func fetchReference(completion: @escaping (String, String) -> Void) {
        if let url = URL(string: "https://beta.ourmanna.com/api/v1/get?format=json&order=daily") {
            let session = URLSession.shared
            let task = session.dataTask(with: url) { (data, response, error) in
                if let error = error {
                    print("Error: \(error.localizedDescription)")
                    completion("", "") // Return empty strings in case of an error
                    return
                }

                if let data = data {
                    do {
                        let apiResponse = try JSONDecoder().decode(ApiResponse.self, from: data)
                        let reference = apiResponse.verse.details.reference
                        let text = apiResponse.verse.details.text // Get the fetched text
                        completion(reference, text) // Pass both reference and text
                    } catch {
                        print("Error parsing JSON: \(error.localizedDescription)")
                        completion("", "") // Return empty strings in case of a parsing error
                    }
                }
            }
            task.resume()
        } else {
            print("Invalid URL")
            completion("", "") // Return empty strings in case of an invalid URL
        }
    }
}

struct SimpleEntry: TimelineEntry {
    let date: Date
    let reference: String
    let text: String // Store the reference here
}

struct IconWidgetView : View {
    var entry: Provider.Entry
    var backgroundColor: Color // Add this property

    init(entry: Provider.Entry, backgroundColor: Color) {
        self.entry = entry
        self.backgroundColor = backgroundColor
    }

    var body: some View {
        VStack(alignment: .center) {
            Text(entry.reference)
                .bold()
                .font(.largeTitle)
                .foregroundColor(.black)
                .frame(maxWidth: .infinity, maxHeight: .infinity) // Fill the space
                .background(backgroundColor) // Apply the background color
        }
        .widgetURL(URL(string: entry.reference)) // Use entry.reference to enable URL tap action
        .containerBackground(.white, for: .widget)
    }
}

struct Textt : View {
    var entry: Provider.Entry
    var backgroundColor: Color // Add this property

    init(entry: Provider.Entry, backgroundColor: Color) {
        self.entry = entry
        self.backgroundColor = backgroundColor
    }

    var body: some View {
        VStack(alignment: .center) {
            Text("\(entry.text) \(entry.reference)").onAppear() {
                    print(entry)
                }
                .bold()
                .font(.footnote)
                .foregroundColor(.black)
                .frame(maxWidth: .infinity, maxHeight: .infinity) // Fill the space
              // .background(backgroundColor) // Apply the background color
            }
        
        .widgetURL(URL(string: entry.reference)) // Use entry.reference to enable URL tap action
        .containerBackground(.white.gradient, for: .widget)
    }
}

struct IconWidget: Widget {
    let kind: String = "small"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: TextProvider()) { entry in
            IconWidgetView(entry: entry, backgroundColor: .white) // Pass the background color here
        }
        .configurationDisplayName("Verse Of The Day (Reference)")
        .description("This complication displays the current verse of the day's reference.")
    }
}

struct TextWidget: Widget {
    let kind: String = "large"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: Provider()) { entry in
           Textt(entry: entry, backgroundColor: .white) // Pass the background color here
        }
        .configurationDisplayName("Verse Of The Day (Full)")
        .description("This widget displays the current verse of the day.")
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        IconWidgetView(entry: SimpleEntry(date: Date(), reference: "Psalm 23:1", text: "The LORD is my shepherd, I shall not be in want"), backgroundColor: .white)
            .previewContext(WidgetPreviewContext(family: .systemSmall))
    }
}
