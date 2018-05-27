//
//  Item.swift
//  ToDOOOO
//
//  Created by yu xu on 5/26/18.
//  Copyright © 2018 yu xu. All rights reserved.
//

import Foundation
import RealmSwift

class Item: Object{
    @objc dynamic var title = ""
    @objc dynamic var done = false
    @objc dynamic var timestamp: Date?
    @objc dynamic var bkgdColor = ""
    var parentCategory = LinkingObjects(fromType: Category.self, property: "items")
}
