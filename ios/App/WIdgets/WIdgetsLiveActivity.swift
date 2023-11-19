//
//  WIdgetsLiveActivity.swift
//  WIdgets
//
//  Created by Jadon Gearhart on 11/19/23.
//

import ActivityKit
import WidgetKit
import SwiftUI

struct WIdgetsAttributes: ActivityAttributes {
    public struct ContentState: Codable, Hashable {
        // Dynamic stateful properties about your activity go here!
        var emoji: String
    }

    // Fixed non-changing properties about your activity go here!
    var name: String
}

struct WIdgetsLiveActivity: Widget {
    var body: some WidgetConfiguration {
        ActivityConfiguration(for: WIdgetsAttributes.self) { context in
            // Lock screen/banner UI goes here
            VStack {
                Text("Hello \(context.state.emoji)")
            }
            .activityBackgroundTint(Color.cyan)
            .activitySystemActionForegroundColor(Color.black)

        } dynamicIsland: { context in
            DynamicIsland {
                // Expanded UI goes here.  Compose the expanded UI through
                // various regions, like leading/trailing/center/bottom
                DynamicIslandExpandedRegion(.leading) {
                    Text("Leading")
                }
                DynamicIslandExpandedRegion(.trailing) {
                    Text("Trailing")
                }
                DynamicIslandExpandedRegion(.bottom) {
                    Text("Bottom \(context.state.emoji)")
                    // more content
                }
            } compactLeading: {
                Text("L")
            } compactTrailing: {
                Text("T \(context.state.emoji)")
            } minimal: {
                Text(context.state.emoji)
            }
            .widgetURL(URL(string: "http://www.apple.com"))
            .keylineTint(Color.red)
        }
    }
}

extension WIdgetsAttributes {
    fileprivate static var preview: WIdgetsAttributes {
        WIdgetsAttributes(name: "World")
    }
}

extension WIdgetsAttributes.ContentState {
    fileprivate static var smiley: WIdgetsAttributes.ContentState {
        WIdgetsAttributes.ContentState(emoji: "😀")
     }
     
     fileprivate static var starEyes: WIdgetsAttributes.ContentState {
         WIdgetsAttributes.ContentState(emoji: "🤩")
     }
}

#Preview("Notification", as: .content, using: WIdgetsAttributes.preview) {
   WIdgetsLiveActivity()
} contentStates: {
    WIdgetsAttributes.ContentState.smiley
    WIdgetsAttributes.ContentState.starEyes
}
