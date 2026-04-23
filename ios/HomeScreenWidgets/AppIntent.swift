//
//  AppIntent.swift
//  HomeScreenWidgets
//
//  Created by WS-MAC-MINI-02 on 17/04/26.
//

import WidgetKit
import AppIntents

struct ConfigurationAppIntent: WidgetConfigurationIntent {
    static var title: LocalizedStringResource { "Configuration" }
    static var description: IntentDescription { "This is an example widget." }

    // An example configurable parameter.
    @Parameter(title: "Favorite Emoji - sha", default: "😃")
    var favoriteEmoji: String
}
