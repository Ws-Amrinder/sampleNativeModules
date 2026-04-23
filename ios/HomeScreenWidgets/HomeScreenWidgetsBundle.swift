//
//  HomeScreenWidgetsBundle.swift
//  HomeScreenWidgets
//
//  Created by WS-MAC-MINI-02 on 17/04/26.
//

import WidgetKit
import SwiftUI

@main
struct HomeScreenWidgetsBundle: WidgetBundle {
    var body: some Widget {
        HomeScreenWidgets()
        HomeScreenWidgetsControl()
        HomeScreenWidgetsLiveActivity()
    }
}
