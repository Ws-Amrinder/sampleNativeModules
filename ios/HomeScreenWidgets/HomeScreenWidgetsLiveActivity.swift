//
//  HomeScreenWidgetsLiveActivity.swift
//  HomeScreenWidgets
//
//  Created by WS-MAC-MINI-02 on 17/04/26.
//

import ActivityKit
import WidgetKit
import SwiftUI

struct HomeScreenWidgetsAttributes: ActivityAttributes {
    public struct ContentState: Codable, Hashable {
        // Dynamic stateful properties about your activity go here!
        var emoji: String
    }

    // Fixed non-changing properties about your activity go here!
    var name: String
}

struct HomeScreenWidgetsLiveActivity: Widget {
    var body: some WidgetConfiguration {
        ActivityConfiguration(for: HomeScreenWidgetsAttributes.self) { context in
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

extension HomeScreenWidgetsAttributes {
    fileprivate static var preview: HomeScreenWidgetsAttributes {
        HomeScreenWidgetsAttributes(name: "World")
    }
}

extension HomeScreenWidgetsAttributes.ContentState {
    fileprivate static var smiley: HomeScreenWidgetsAttributes.ContentState {
        HomeScreenWidgetsAttributes.ContentState(emoji: "😀")
     }
     
     fileprivate static var starEyes: HomeScreenWidgetsAttributes.ContentState {
         HomeScreenWidgetsAttributes.ContentState(emoji: "🤩")
     }
}

#Preview("Notification", as: .content, using: HomeScreenWidgetsAttributes.preview) {
   HomeScreenWidgetsLiveActivity()
} contentStates: {
    HomeScreenWidgetsAttributes.ContentState.smiley
    HomeScreenWidgetsAttributes.ContentState.starEyes
}
