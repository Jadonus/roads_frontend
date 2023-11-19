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
}

struct Provider: TimelineProvider {
    func placeholder(in context: Context) -> SimpleEntry {
        SimpleEntry(date: Date(), reference: "")
    }

    func getSnapshot(in context: Context, completion: @escaping (SimpleEntry) -> ()) {
        let entry = SimpleEntry(date: Date(), reference: "")
        completion(entry)
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<SimpleEntry>) -> ()) {
        // Fetch the reference from the API
        fetchReference { reference in
            // Create a timeline entry with the current date and the fetched reference
            let entry = SimpleEntry(date: Date(), reference: reference)
            let timeline = Timeline(entries: [entry], policy: .atEnd)
            completion(timeline)
        }
    }

    // Function to fetch the reference from the API
    func fetchReference(completion: @escaping (String) -> Void) {
        if let url = URL(string: "https://beta.ourmanna.com/api/v1/get?format=json&order=daily") {
            let session = URLSession.shared
            let task = session.dataTask(with: url) { (data, response, error) in
                if let error = error {
                    print("Error: \(error.localizedDescription)")
                    completion("") // Return an empty string in case of an error
                    return
                }

                if let data = data {
                    do {
                        let apiResponse = try JSONDecoder().decode(ApiResponse.self, from: data)
                        let reference = apiResponse.verse.details.reference
                        completion(reference)
                    } catch {
                        print("Error parsing JSON: \(error.localizedDescription)")
                        completion("") // Return an empty string in case of a parsing error
                    }
                }
            }
            task.resume()
        } else {
            print("Invalid URL")
            completion("") // Return an empty string in case of an invalid URL
        }
    }
}

struct SimpleEntry: TimelineEntry {
    let date: Date
    let reference: String // Store the reference here
}

struct IconWidgetView : View {
    var entry: Provider.Entry

    var body: some View {
        VStack {
            // Display your icon here



            // Display the fetched reference
             Image(systemName: "book.pages.fill")
                .resizable()
                    .aspectRatio(contentMode: .fit)
                .imageScale(.large)
                .frame(width: 30, height: 30, alignment: .topLeading)

        }
         .widgetLabel(entry.reference)


        .containerBackground(.red.gradient, for: .widget)

    }

}

@main
struct IconWidget: Widget {
    let kind: String = "small"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: Provider()) { entry in
            IconWidgetView(entry: entry)
        }
        .configurationDisplayName("Verse Of The Day")
        .description("This complication displays the current verse of the day's reference.")

    }
}
struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        IconWidgetView(entry: SimpleEntry(date: Date(), reference: "THE THING LOL"))
            .previewContext(WidgetPreviewContext(family: .accessoryCorner))
    }
}
