# Differences Between `$WeakSignal` and `$Signal`

| Feature               | `$WeakSignal`                                                                                                       | `$Signal`                                                                                                         |
| --------------------- | ------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| **Subscriptions**     | Subscriptions are manually managed, and the subscriber list can grow indefinitely without cleanup.                  | Subscriptions include an unsubscribe function for explicit cleanup, preventing memory leaks.                      |
| **Reactivity**        | Weak reactivity: Requires explicit calls to notify subscribers when value changes.                                  | Strong reactivity: Automatically notifies all active subscribers on value change.                                 |
| **Use Case**          | Useful for lightweight, temporary reactive values where strong guarantees are not required.                         | Ideal for robust reactive values where consistent reactivity and subscription management are essential.           |
| **Performance**       | Slightly faster due to simpler management, but can cause inefficiencies over time if subscriptions are not removed. | Provides consistent performance, especially in applications with many dynamic subscriptions.                      |
| **Memory Management** | Does not remove stale or unused subscriptions automatically, leading to potential memory bloat.                     | Offers explicit subscription removal with `unsubscribe()`, reducing memory usage and preventing stale references. |

# Differences Between `$WeakStore` and `$Store`

| Feature              | `$WeakStore`                                                                         | `$Store`                                                                               |
| -------------------- | ------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- |
| **State Management** | Relies on manual setting and getting of individual keys via `set` and `get` methods. | Uses a `Proxy` to automatically detect and notify changes to state.                    |
| **Reactivity**       | Weak reactivity: Updates must explicitly notify subscribers.                         | Strong reactivity: Automatically notifies all subscribers on any state change.         |
| **Notifications**    | Requires manual calls to notify listeners of state updates.                          | Notifications are handled transparently by the `Proxy`.                                |
| **Ease of Use**      | More verbose: Requires explicit method calls (`set`/`get`).                          | Cleaner and more intuitive API, as property access (`state[key]`) triggers reactivity. |
| **Performance**      | Performance depends on manually written logic for managing state updates.            | Efficient, as the `Proxy` optimizes state management and change detection.             |
| **Use Case**         | Suitable for small, simple stores with limited state and fewer updates.              | Perfect for complex applications requiring robust and automated state management.      |

# Summary

-   **Use `$WeakSignal` and `$WeakStore`**:

    -   When lightweight, temporary reactivity is sufficient.
    -   If you prefer manual control over notifying and managing subscriptions.
    -   In scenarios where simplicity and minimalism outweigh robustness.

-   **Use `$Signal` and `$Store`**:
    -   For strong reactivity with guaranteed state consistency.
    -   When you need automated subscription management and clean APIs.
    -   In applications requiring reliable and scalable reactivity, especially with many dynamic listeners.

By choosing the right version (`Weak` or `Strong`) based on your application’s needs, you can optimize for performance, memory usage, and developer experience.
