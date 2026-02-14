import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

/* ─── Hamburger Icon Component ─── */
function HamburgerIcon() {
  return (
    <View style={hamburger.icon}>
      <View style={hamburger.line} />
      <View style={hamburger.line} />
      <View style={hamburger.line} />
    </View>
  );
}

const hamburger = StyleSheet.create({
  icon: { gap: 5, padding: 4 },
  line: {
    width: 22,
    height: 2.5,
    backgroundColor: "#FFFFFF",
    borderRadius: 2,
  },
});

const STATS = [
  { label: "Members", value: "1,284", icon: "👥" },
  { label: "Active Today", value: "347", icon: "🔥" },
  { label: "Revenue", value: "₹2.4L", icon: "💰" },
  { label: "Classes", value: "18", icon: "🏋️" },
];

const QUICK_ACTIONS = [
  {
    label: "Add Member",
    icon: "➕",
    color: "#E8380D",
    route: "/member/AddMember",
  },
  { label: "Schedule", icon: "📅", color: "#E07B00", route: "/home/schedule" },
  { label: "Reports", icon: "📊", color: "#0088CC", route: "home/dashboard" },
  {
    label: "Settings",
    icon: "⚙️",
    color: "#7B3FBF",
    route: "/settings/settings",
  },
];

const RECENT_ACTIVITY = [
  {
    name: "Rohan Mehta",
    action: "Renewed membership",
    time: "2m ago",
    avatar: "💪",
  },
  {
    name: "Priya Sharma",
    action: "Joined Premium plan",
    time: "14m ago",
    avatar: "🧘",
  },
  { name: "Arjun Singh", action: "Checked in", time: "22m ago", avatar: "🏃" },
  {
    name: "Kavya Nair",
    action: "PT session booked",
    time: "1h ago",
    avatar: "🥊",
  },
];

export default function ProfileScreen() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#E8380D" />

      {/* ── DROPDOWN MENU MODAL ── */}
      <Modal
        transparent
        visible={menuOpen}
        animationType="fade"
        onRequestClose={() => setMenuOpen(false)}
      >
        <Pressable style={styles.backdrop} onPress={() => setMenuOpen(false)}>
          <Pressable style={styles.dropdownMenu} onPress={() => {}}>
            {/* Menu Header */}
            <View style={styles.menuHeader}>
              <Text style={styles.menuTitle}>OPTIONS</Text>
              <TouchableOpacity
                onPress={() => setMenuOpen(false)}
                style={styles.closeBtn}
              >
                <Text style={styles.closeBtnText}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.menuDivider} />

            {/* Change Password */}
            <TouchableOpacity
              style={styles.menuItem}
              activeOpacity={0.7}
              onPress={() => {
                setMenuOpen(false);
                // navigation.navigate('ChangePassword')

                router.push("/changePassword/changePassword");

              }}
            >
              <View
                style={[
                  styles.menuIconBox,
                  { backgroundColor: "#FFF3E0", borderColor: "#FFB74D" },
                ]}
              >
                <Text style={styles.menuItemIcon}>🔒</Text>
              </View>
              <View style={styles.menuItemText}>
                <Text style={styles.menuItemLabel}>Change Password</Text>
                <Text style={styles.menuItemSub}>
                  Update your account password
                </Text>
              </View>
              <Text style={styles.menuChevron}>›</Text>
            </TouchableOpacity>

            <View style={styles.menuDivider} />

            {/* Logout */}
            <TouchableOpacity
              style={styles.menuItem}
              activeOpacity={0.7}
              onPress={() => {
                setMenuOpen(false);
                // handle logout
              }}
            >
              <View
                style={[
                  styles.menuIconBox,
                  { backgroundColor: "#FFEBEE", borderColor: "#EF9A9A" },
                ]}
              >
                <Text style={styles.menuItemIcon}>🚪</Text>
              </View>
              <View style={styles.menuItemText}>
                <Text style={[styles.menuItemLabel, { color: "#D32F2F" }]}>
                  Logout
                </Text>
                <Text style={styles.menuItemSub}>Sign out of your account</Text>
              </View>
              <Text style={[styles.menuChevron, { color: "#D32F2F" }]}>›</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── HEADER BAND ── */}
        <View style={styles.headerBand}>
          <View style={styles.headerContent}>
            {/* Avatar */}
            <View style={styles.avatarWrapper}>
              <View style={styles.avatarRing}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarEmoji}>⚡</Text>
                </View>
              </View>
              <View style={styles.onlineBadge} />
            </View>

            {/* Name block */}
            <View style={styles.nameBlock}>
              <Text style={styles.roleTag}>GYM ADMINISTRATOR</Text>
              <Text style={styles.adminName}>Vikram Rathore</Text>
              <Text style={styles.gymName}>
                🏆 IronCore Fitness — Andheri West
              </Text>
            </View>

            {/* ── HAMBURGER BUTTON ── */}
            <TouchableOpacity
              style={styles.hamburgerBtn}
              activeOpacity={0.7}
              onPress={() => setMenuOpen(true)}
            >
              <HamburgerIcon />
            </TouchableOpacity>
          </View>
        </View>

        {/* ── STATS GRID ── */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>TODAYS OVERVIEW</Text>
          <View style={styles.statsGrid}>
            {STATS.map((s, i) => (
              <View
                key={i}
                style={[styles.statCard, i % 2 === 0 && styles.statCardAccent]}
              >
                <Text style={styles.statIcon}>{s.icon}</Text>
                <Text style={styles.statValue}>{s.value}</Text>
                <Text style={styles.statLabel}>{s.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ── QUICK ACTIONS ── */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>QUICK ACTIONS</Text>
          <View style={styles.actionsRow}>
            {QUICK_ACTIONS.map((a, i) => (
              <TouchableOpacity
                key={i}
                style={styles.actionBtn}
                activeOpacity={0.75}
                onPress={() => router.push(a.route)}
              >
                <View
                  style={[
                    styles.actionIconBox,
                    { borderColor: a.color, backgroundColor: a.color + "15" },
                  ]}
                >
                  <Text style={styles.actionIcon}>{a.icon}</Text>
                </View>
                <Text style={[styles.actionLabel, { color: a.color }]}>
                  {a.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ── ADMIN INFO CARD ── */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>ADMIN DETAILS</Text>
          <View style={styles.infoCard}>
            {[
              { icon: "📧", label: "Email", value: "vikram@ironcore.in" },
              { icon: "📱", label: "Phone", value: "+91 98765 43210" },
              { icon: "📍", label: "Branch", value: "Andheri West, Mumbai" },
              { icon: "🗓️", label: "Member Since", value: "March 2021" },
              { icon: "🔑", label: "Role", value: "Super Admin" },
            ].map((item, i) => (
              <View
                key={i}
                style={[styles.infoRow, i !== 0 && styles.infoRowBorder]}
              >
                <Text style={styles.infoIcon}>{item.icon}</Text>
                <View style={styles.infoText}>
                  <Text style={styles.infoLabel}>{item.label}</Text>
                  <Text style={styles.infoValue}>{item.value}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* ── PERFORMANCE BAR ── */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>MONTHLY TARGETS</Text>
          <View style={styles.perfCard}>
            {[
              { label: "New Members", pct: 78, color: "#E8380D" },
              { label: "Revenue Goal", pct: 65, color: "#E07B00" },
              { label: "Retention Rate", pct: 91, color: "#0088CC" },
            ].map((p, i) => (
              <View key={i} style={styles.perfItem}>
                <View style={styles.perfHeaderRow}>
                  <Text style={styles.perfLabel}>{p.label}</Text>
                  <Text style={[styles.perfPct, { color: p.color }]}>
                    {p.pct}%
                  </Text>
                </View>
                <View style={styles.barTrack}>
                  <View
                    style={[
                      styles.barFill,
                      { width: `${p.pct}%`, backgroundColor: p.color },
                    ]}
                  />
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* ── RECENT ACTIVITY ── */}
        <View style={[styles.section, { marginBottom: 28 }]}>
          <Text style={styles.sectionLabel}>RECENT ACTIVITY</Text>
          <View style={styles.activityCard}>
            {RECENT_ACTIVITY.map((a, i) => (
              <View
                key={i}
                style={[styles.activityRow, i !== 0 && styles.activityBorder]}
              >
                <View style={styles.activityAvatar}>
                  <Text style={{ fontSize: 20 }}>{a.avatar}</Text>
                </View>
                <View style={styles.activityInfo}>
                  <Text style={styles.activityName}>{a.name}</Text>
                  <Text style={styles.activityAction}>{a.action}</Text>
                </View>
                <Text style={styles.activityTime}>{a.time}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={{ height: 50 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#F5F5F5" },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 20 },

  /* ── BACKDROP & DROPDOWN ── */
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  dropdownMenu: {
    marginTop: 72,
    marginRight: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    width: 260,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 12,
  },
  menuHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#FAFAFA",
  },
  menuTitle: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 2.5,
    color: "#AAAAAA",
  },
  closeBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#F0F0F0",
    justifyContent: "center",
    alignItems: "center",
  },
  closeBtnText: {
    color: "#888888",
    fontSize: 12,
    fontWeight: "700",
  },
  menuDivider: {
    height: 1,
    backgroundColor: "#F0F0F0",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
    backgroundColor: "#FFFFFF",
  },
  menuIconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  menuItemIcon: { fontSize: 18 },
  menuItemText: { flex: 1 },
  menuItemLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 2,
  },
  menuItemSub: {
    fontSize: 11,
    color: "#AAAAAA",
    fontWeight: "500",
  },
  menuChevron: {
    fontSize: 22,
    color: "#CCCCCC",
    fontWeight: "300",
    marginTop: -2,
  },

  /* ── HEADER ── */
  headerBand: {
    backgroundColor: "#E8380D",
    paddingBottom: 28,
    paddingTop: 16,
    marginTop: 2,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,

    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    gap: 14,
  },
  avatarWrapper: { position: "relative" },
  avatarRing: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 2.5,
    borderColor: "rgba(255,255,255,0.6)",
    padding: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarEmoji: { fontSize: 30 },
  onlineBadge: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#00E676",
    borderWidth: 2,
    borderColor: "#E8380D",
  },
  nameBlock: { flex: 1 },
  roleTag: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 2,
    color: "rgba(255,255,255,0.75)",
    marginBottom: 2,
  },
  adminName: {
    fontSize: 22,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
  gymName: { fontSize: 12, color: "rgba(255,255,255,0.7)", marginTop: 2 },

  /* ── HAMBURGER BUTTON ── */
  hamburgerBtn: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },

  /* ── SECTIONS ── */
  section: { paddingHorizontal: 20, marginTop: 24 },
  sectionLabel: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 2.5,
    color: "#AAAAAA",
    marginBottom: 12,
  },

  /* ── STATS ── */
  statsGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  statCard: {
    flex: 1,
    minWidth: "45%",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    alignItems: "flex-start",
    borderWidth: 1,
    borderColor: "#EEEEEE",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  statCardAccent: {
    borderColor: "#E8380D",
    borderWidth: 1.5,
  },
  statIcon: { fontSize: 22, marginBottom: 8 },
  statValue: {
    fontSize: 26,
    fontWeight: "900",
    color: "#1A1A1A",
    letterSpacing: -0.5,
  },
  statLabel: {
    fontSize: 12,
    color: "#999999",
    marginTop: 2,
    fontWeight: "600",
  },

  /* ── QUICK ACTIONS ── */
  actionsRow: { flexDirection: "row", justifyContent: "space-between" },
  actionBtn: { alignItems: "center", gap: 8 },
  actionIconBox: {
    width: 58,
    height: 58,
    borderRadius: 14,
    borderWidth: 1.5,
    justifyContent: "center",
    alignItems: "center",
  },
  actionIcon: { fontSize: 24 },
  actionLabel: { fontSize: 10, fontWeight: "800", letterSpacing: 0.5 },

  /* ── INFO CARD ── */
  infoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  infoRowBorder: { borderTopWidth: 1, borderTopColor: "#F5F5F5" },
  infoIcon: { fontSize: 18, width: 28 },
  infoText: { flex: 1 },
  infoLabel: {
    fontSize: 11,
    color: "#AAAAAA",
    fontWeight: "700",
    letterSpacing: 0.5,
    marginBottom: 1,
  },
  infoValue: { fontSize: 14, color: "#222222", fontWeight: "600" },

  /* ── PERFORMANCE ── */
  perfCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    padding: 16,
    gap: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  perfItem: { gap: 8 },
  perfHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  perfLabel: { fontSize: 13, color: "#555555", fontWeight: "700" },
  perfPct: { fontSize: 14, fontWeight: "900", letterSpacing: 0.5 },
  barTrack: {
    height: 7,
    backgroundColor: "#F0F0F0",
    borderRadius: 4,
    overflow: "hidden",
  },
  barFill: { height: "100%", borderRadius: 4 },

  /* ── ACTIVITY ── */
  activityCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  activityRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  activityBorder: { borderTopWidth: 1, borderTopColor: "#F5F5F5" },
  activityAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#FFF3F0",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFD5CC",
  },
  activityInfo: { flex: 1 },
  activityName: { fontSize: 14, fontWeight: "700", color: "#1A1A1A" },
  activityAction: { fontSize: 12, color: "#AAAAAA", marginTop: 1 },
  activityTime: { fontSize: 11, color: "#CCCCCC", fontWeight: "600" },
});
